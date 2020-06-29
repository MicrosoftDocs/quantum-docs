<#
.DESCRIPTION
Helper script to create your first Azure Quantum Workspace.

Please install Azure CLI from https://docs.microsoft.com/cli/azure/install-azure-cli 

Workspace information, when succesfully created, is stored under ./AzureQuantumConnectionStrings.txt

Available commands
    quantum-workspace.ps1 create            To create a workspace
    quantum-workspace.ps1 show              To show the connection string of your storage account
    quantum-workspace.ps1 delete            To delete a workspace
    quantum-workspace.ps1 delete_storage    To delete a storage account

.EXAMPLE
.\quantum-workspace.ps1 create -s 00000000-0000-0000-0000-000000000000 -rg myname-rg -n myname-wspc

Checking if group myname-rg for 00000000-0000-0000-0000-000000000000 exists
Creating resource group myname-rg...
Creating storage account stmynamerg...
Creating Workspace myname-wspc
Your resources have been created. You can connect using the following info:

Subscription id         00000000-0000-0000-0000-000000000000
Resource group          myname-rg
Workspace name          myname-wspc
Storage name            stmynamerg
Storage string          DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=stmynamerg;AccountKey=...==

.EXAMPLE
quantum-workspace.ps1 show -s 00000000-0000-0000-0000-000000000000 -rg myname-rg -w myname-wspc

Subscription id         00000000-0000-0000-0000-000000000000
Resource group          myname-rg
Workspace name          myname-wspc
Storage name            stmynamerg
Storage string          DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=stmynamerg;AccountKey=...==

#>

# User-assigned variables
param (
    [Parameter(Position=0, Mandatory=$true, HelpMessage="Valid commands: show, create, delete, delete_storage")]
    [string] [ValidateSet("show", "create", "delete", "delete_storage")] $cmd,


    [Alias("s")] [string]$subscription = $( Read-Host "Provide Subscription ID" ),
    [Alias("g","rg")] [string]$group = $( Read-Host "Provide Resource Group" ),
    [Alias("n", "w")] [Parameter(Mandatory=$false)] [string]$name,
    [Alias("st")] [string]$storage ="st$group"
)

$SUBSCRIPTION_ID=$subscription
$RESOURCE_GROUP=$group
$STORAGE_ACCOUNT=($storage -replace '-','') -replace '_',''
$WORKSPACE_NAME=$name

# CONFIG - do not modify
$RESOURCE_PROVIDER ="Microsoft.Quantum"
$RESOURCE_TYPE = "$RESOURCE_PROVIDER/workspaces"
$RESOURCE_LOCATION ="westus"
$API_VERSION = "2019-11-04-preview"
$CREATION_PROPERTIES = '{\"providers\":[{\"providerId\":\"Microsoft\",\"providerSku\":\"Basic\"}]}'
$PRIV_FEATURE_NAME= $RESOURCE_PROVIDER + "/betaAccess"

Function check_fail([string] $msg) {
    if($?){
        #Success
    }
    else {
        #Failure
        if ($msg) {
            Write-Output $msg
        }
        exit 1
    }
}

Function register_rp_if_needed {
    Write-Output "Querying $RESOURCE_PROVIDER registration state in your subscription."
    $OUTPUT = az provider show --namespace $RESOURCE_PROVIDER --subscription $SUBSCRIPTION_ID --query "registrationState" --output tsv
    if ($OUTPUT -and $OUTPUT.Contains("not found"))
    {
        Write-Output $OUTPUT
        return 1
    }
    if ($OUTPUT -and $OUTPUT.equals("Registered")) {
        Write-Output "$RESOURCE_PROVIDER is already registered in $SUBSCRIPTION_ID"
    }
    else
    {
        Write-Output "Registering $RESOURCE_PROVIDER provider in your subscription. This will only happen once..."
        $OUTPUT = az provider register --namespace "$RESOURCE_PROVIDER" --subscription "$SUBSCRIPTION_ID" --wait
        if ($OUTPUT -and $OUTPUT.equals("Registered")) {
            $OUTPUT = az feature list --namespace "$RESOURCE_PROVIDER" --subscription "$SUBSCRIPTION_ID" --query "@[?name == '$PRIV_FEATURE_NAME'].properties.state" --output tsv
            Write-Output $OUTPUT
            return 0
        }
        else {
            Write-Output "ERROR: The subscription '$SUBSCRIPTION_ID' does not have access to the private preview. Please contact the Azure Quantum team to ensure your subscription is correctly registered."
            return 1
        }
    }
    return 0
}

Function print_workspace_constructor() {
    $CS=az storage account show-connection-string --resource-group $RESOURCE_GROUP --name $STORAGE_ACCOUNT --subscription $SUBSCRIPTION_ID --output tsv
    if ($?)
    {
    }
    else {
        $CS="<Storage account not found or accessible: $STORAGE_ACCOUNT>"
    }
    
    Write-Output ""
    Write-Output "Subscription id`t`t$SUBSCRIPTION_ID"
    Write-Output "Resource group`t`t$RESOURCE_GROUP"
    Write-Output "Workspace name`t`t$WORKSPACE_NAME"
    Write-Output "Storage name`t`t$STORAGE_ACCOUNT"
    Write-Output "Storage string`t`t$CS"
    Write-Output ""

    $connection_file = "AzureQuantumConnectionStrings.txt"
    Write-Output "" | Out-File -FilePath $connection_file -Append
    Write-Output "Subscription id`t`t$SUBSCRIPTION_ID" | Out-File -FilePath $connection_file -Append
    Write-Output "Resource group`t`t$RESOURCE_GROUP" | Out-File -FilePath $connection_file -Append
    Write-Output "Workspace name`t`t$WORKSPACE_NAME" | Out-File -FilePath $connection_file -Append
    Write-Output "Storage name`t`t$STORAGE_ACCOUNT" | Out-File -FilePath $connection_file -Append
    Write-Output "Storage string`t`t$CS" | Out-File -FilePath $connection_file -Append
}

Function create(){  
    if ($WORKSPACE_NAME.Equals(""))
    {
        [Alias("n", "w")] [string]$name = $( Read-Host "Provide Workspace name" )
    }

    $WORKSPACE_NAME=$name
    
    $OUTPUT = register_rp_if_needed
    if ($OUTPUT -and $OUTPUT -eq 1)
    {
        exit 1
    }

    Write-Output "Checking if group $RESOURCE_GROUP for $SUBSCRIPTION_ID exists"
    $isExist = az group exists --subscription $SUBSCRIPTION_ID --name $RESOURCE_GROUP
    if ($isExist -eq 'false'){
        Write-Output "Creating resource group $RESOURCE_GROUP..."
        az group create --subscription "$SUBSCRIPTION_ID" --name "$RESOURCE_GROUP" --location "$RESOURCE_LOCATION" | Out-Null
        check_fail
    }
    else {
        Write-Output "$RESOURCE_GROUP already exists"
    }
    
    Write-Output "Creating storage account $STORAGE_ACCOUNT..."
    az storage account create --resource-group $RESOURCE_GROUP --name $STORAGE_ACCOUNT --subscription $SUBSCRIPTION_ID --location $RESOURCE_LOCATION | Out-Null
    check_fail

    Write-Output "Creating Workspace $WORKSPACE_NAME"
    az resource create -g $RESOURCE_GROUP -n $WORKSPACE_NAME --subscription $SUBSCRIPTION_ID --resource-type $RESOURCE_TYPE --api-version $API_VERSION --location $RESOURCE_LOCATION --properties $CREATION_PROPERTIES | Out-Null
    check_fail

    Write-Output "Your resources have been created. You can connect using the following info:"
    print_workspace_constructor
}

Function show(){
    if ($WORKSPACE_NAME.Equals(""))
    {
        [Alias("n", "w")] [string]$name = $( Read-Host "Provide Workspace name" )
        $WORKSPACE_NAME=$name
    }

    az resource show -g $RESOURCE_GROUP -n $WORKSPACE_NAME --subscription $SUBSCRIPTION_ID --resource-type $RESOURCE_TYPE --api-version $API_VERSION | Out-Null
    check_fail "Workspace not found: $WORKSPACE_NAME"
    print_workspace_constructor
}

Function delete_workspace(){
    if ($WORKSPACE_NAME.Equals(""))
    {
        [Alias("n", "w")] [string]$name = $( Read-Host "Provide Workspace name" )
        $WORKSPACE_NAME=$name
    }

    
    $OUTPUT = register_rp_if_needed
    if ($OUTPUT -and $OUTPUT -eq 1)
    {
        exit 1
    }

    az resource show -g $RESOURCE_GROUP -n $WORKSPACE_NAME --subscription $SUBSCRIPTION_ID --resource-type $RESOURCE_TYPE --api-version $API_VERSION | Out-Null
    check_fail "Workspace not found: $WORKSPACE_NAME"

    az storage account delete --subscription $SUBSCRIPTION_ID --resource-group $RESOURCE_GROUP --name $STORAGE_ACCOUNT

    az resource delete -g $RESOURCE_GROUP -n $WORKSPACE_NAME --subscription $SUBSCRIPTION_ID --resource-type $RESOURCE_TYPE --api-version $API_VERSION
    check_fail
    Write-Output "Workspace '$WORKSPACE_NAME' deleted."
}

Function delete_storage(){
    Write-Output "Delete Storage Account $STORAGE_ACCOUNT"
    az storage account delete --subscription $SUBSCRIPTION_ID --resource-group $RESOURCE_GROUP --name $STORAGE_ACCOUNT
    check_fail
    Write-Output "Storage account '$STORAGE_ACCOUNT' deleted."
}

switch ($cmd) {
    "show" { show }
    "create" { create }
    "delete" { delete_workspace }
    "delete_storage" { delete_storage }
    Default {}
}

