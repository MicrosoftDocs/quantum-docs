#!/bin/sh

# User-assigned variables
SUBSCRIPTION_ID=""
RESOURCE_GROUP=""
WORKSPACE_NAME=""
STORAGE_ACCOUNT=""

# CONFIG - do not modify
RESOURCE_PROVIDER="Microsoft.Quantum"
RESOURCE_TYPE="$RESOURCE_PROVIDER/Workspaces"
RESOURCE_LOCATION="westus"
API_VERSION="2019-11-04-preview"
CREATION_PROPERTIES='{"providers":[{"providerId":"Microsoft","providerSku":"Basic"}]}'
STORAGE_PREFIX="st"
PRIV_FEATURE_NAME="$RESOURCE_PROVIDER/betaAccess"
AZ="az"

create () {
    register_rp_if_needed

    if [ $($AZ group exists --subscription "$SUBSCRIPTION_ID" --name "$RESOURCE_GROUP") = false ]; then
        echo "Creating resource group $RESOURCE_GROUP..."
        $AZ group create --subscription "$SUBSCRIPTION_ID" --name "$RESOURCE_GROUP" --location "$RESOURCE_LOCATION"
        check_fail
    fi

    $AZ storage account show --subscription "$SUBSCRIPTION_ID" --resource-group "$RESOURCE_GROUP" --name "$STORAGE_ACCOUNT" > /dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo "Creating storage account $STORAGE_ACCOUNT..."
        $AZ storage account create \
            --resource-group "$RESOURCE_GROUP" \
            --name "$STORAGE_ACCOUNT" \
            --subscription "$SUBSCRIPTION_ID" \
            --location "$RESOURCE_LOCATION"
        check_fail
    fi

    $AZ resource create \
        -g "$RESOURCE_GROUP" \
        -n "$WORKSPACE_NAME" \
        --subscription "$SUBSCRIPTION_ID" \
        --resource-type "$RESOURCE_TYPE" \
        --api-version "$API_VERSION" \
        --location "$RESOURCE_LOCATION" \
        --properties "$CREATION_PROPERTIES" 1>/dev/null

    check_fail

    echo "Your resources have been created. You can connect using the following info:"
    print_workspace_constructor
}

show () {
    $AZ resource show \
        -g "$RESOURCE_GROUP" \
        -n "$WORKSPACE_NAME" \
        --subscription "$SUBSCRIPTION_ID" \
        --resource-type "$RESOURCE_TYPE" \
        --api-version "$API_VERSION"  > /dev/null

    check_fail "Workspace not found: $WORKSPACE_NAME"

    print_workspace_constructor
}

delete () {
    register_rp_if_needed

    OUTPUT=$($AZ resource show \
        -g "$RESOURCE_GROUP" \
        -n "$WORKSPACE_NAME" \
        --subscription "$SUBSCRIPTION_ID" \
        --resource-type "$RESOURCE_TYPE" \
        --api-version "$API_VERSION" >/dev/null)

    if [ $? -ne 0 ]; then
        echo $OUTPUT
        exit 1
    fi
    
    $AZ resource delete \
        -g "$RESOURCE_GROUP" \
        -n "$WORKSPACE_NAME" \
        --subscription "$SUBSCRIPTION_ID" \
        --resource-type "$RESOURCE_TYPE" \
        --api-version "$API_VERSION"

    if [ $? -eq 0 ]; then
        echo "Workspace '$WORKSPACE_NAME' deleted."
    fi

    $AZ storage account show --subscription "$SUBSCRIPTION_ID" --resource-group "$RESOURCE_GROUP" --name "$STORAGE_ACCOUNT" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        warn "Warning: did not delete storage account: $STORAGE_ACCOUNT. Run 'quantum-workspace delete-storage' to delete your storage account." 
    fi
}

delete_storage () {
    $AZ storage account delete --subscription "$SUBSCRIPTION_ID" --resource-group "$RESOURCE_GROUP" --name "$STORAGE_ACCOUNT"
    check_fail
    echo "Storage account '$STORAGE_ACCOUNT' deleted."
}

register_rp_if_needed () {
    OUTPUT=$($AZ provider show --namespace "$RESOURCE_PROVIDER" --subscription "$SUBSCRIPTION_ID" --query "registrationState" --output tsv)
    check_fail "ERROR: Could not query resource provider registration state"

    if [ "$OUTPUT" != "Registered" ]; then
        echo "Registering $RESOURCE_PROVIDER provider in your subscription. This will only happen once..."
        $AZ provider register --namespace "$RESOURCE_PROVIDER" --subscription "$SUBSCRIPTION_ID" --wait
        check_fail "ERROR: Resource provider registration failed"
    fi

    OUTPUT=$($AZ feature list --namespace "$RESOURCE_PROVIDER" --subscription "$SUBSCRIPTION_ID" --query "@[?name=='$PRIV_FEATURE_NAME'].properties.state" --output tsv)
    check_fail "ERROR: Could not query resource provider feature registration state"
    if [ "$OUTPUT" != "Registered" ]; then
        error "ERROR: The subscription '$SUBSCRIPTION_ID' does not have access to the private preview. Please contact the $AZure Quantum team to ensure your subscription is correctly registered."
        exit 1
    fi
}

print_workspace_constructor() {
    CS=$($AZ storage account show-connection-string \
            --resource-group "$RESOURCE_GROUP" \
            --name "$STORAGE_ACCOUNT" \
            --subscription "$SUBSCRIPTION_ID" \
            --output tsv)
    if [ $? -ne 0 ]; then
        error "Azure storage connection string returned '$?', with outpt: $CS"
        CS="\e[31m<Storage account not found or accessible: $STORAGE_ACCOUNT>\e[0m"
    fi
    
    print_var "subscription_id" "   $SUBSCRIPTION_ID"
    print_var "resource_group" "    $RESOURCE_GROUP"
    print_var "name" "              $WORKSPACE_NAME"
    print_var "storage" "           $CS"
}

check_az() {
    command -v $AZ >/dev/null
    if [ $? -ne 0 ]; then
        command -v "$AZ.cmd" >/dev/null
        check_fail "ERROR: the '$AZ' cli is not installed. Please see https://aka.ms/az-cli"
        AZ="$AZ.cmd"
    fi
}

error() {
    echo "\e[31m$1\e[0m"
}

warn() {
    echo "\e[33m$1\e[0m"
}

print_var() {
    echo "\e[34m$1\e[0m: $2"
}

check_fail () {
    if [ $? -ne 0 ]; then
        if [ -n "$1" ]; then
            error "$1"
        fi
        exit 1
    fi
}

check_required_arg () {
    if [ -z "$2" ]; then
        error "ERROR: missing required argument: $1"
        echo
        print_usage
        exit 1
    fi
}

print_usage () {
    echo "USAGE: quantum-workspace show|create|delete|delete-storage [OPTIONS]"
    echo "  -g | --resource-group   \e[34m[group]\e[0m   The resource group to deploy in"
    echo "  -n | --name             \e[34m[name]\e[0m    The name of the workspace to create"
    echo "  -s | --subscription     \e[34m[id]\e[0m      [optional] The subscription ID to deploy in. Defaults to the default subscription set for the az cli."
    echo "  --storage-account       \e[34m[name]\e[0m    [optional] The name of the storage account to create. If ommited defaults to '$STORAGE_PREFIX<WorkspaceName>'."
    exit 1;
}

check_az

if [ $# -eq 0 ]; then
    print_usage
    exit 0
fi

while :; do
  case "$1" in
    -s|--subscription)
      SUBSCRIPTION_ID="$2"
      shift 2
      ;;
    -g|--resource-group)
      RESOURCE_GROUP="$2"
      shift 2
      ;;
    -n|--name)
      WORKSPACE_NAME="$2"
      shift 2
      ;;
    --storage-account)
      STORAGE_ACCOUNT="$2"
      shift 2
      ;;
    --help)
      print_usage
      exit 1
      ;;
    create|show|delete|delete-storage)
      COMMAND="$1"
      shift
      ;;
    -?*)
      error "Error: Unsupported argument $1" >&2
      echo 
      print_usage
      exit 1
      ;;
    *)
      break
      ;;
  esac
done

if [ -z "$SUBSCRIPTION_ID" ]; then
    SUBSCRIPTION_ID=$($AZ account show --output tsv --query "id")
fi

check_required_arg "Subscription ID" $SUBSCRIPTION_ID
check_required_arg "Resource Group" $RESOURCE_GROUP
check_required_arg "Workspace Name" $WORKSPACE_NAME

if [ -z "$STORAGE_ACCOUNT" ]; then
    STORAGE_ACCOUNT="$STORAGE_PREFIX$WORKSPACE_NAME"
fi

STORAGE_ACCOUNT=$(echo "${STORAGE_ACCOUNT}" | sed -e 's/[A-Z]/\L&/g' -e 's/[^a-z0-9]//g')

case "$COMMAND" in
    "show")
        show
        exit 0;;
    "create")
        create
        exit 0;;
    "delete")
        delete
        exit 0;;
    "delete-storage")
        delete_storage
        exit 0;;
    *)
        print_usage
        exit 1;;
esac