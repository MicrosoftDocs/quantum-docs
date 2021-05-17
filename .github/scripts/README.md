# Automatic broken links scan documentation

To keep track of the broken links that might appear in our documentation we run a 
[Powershell script](https://github.com/MicrosoftDocs/quantum-docs-private/blob/quantum-docs-scan/.github/scripts/Verify-Links.ps1)
that scans links through the `*.md` and `*.yml` files of the docs repositories and flags those links that are broken. The script is programmed to
run with each push to the "live" branch of the repo **MicrosoftDocs/quantum-docs-private**.

## The script

We use a [Powershell script](https://github.com/MicrosoftDocs/quantum-docs-private/blob/quantum-docs-scan/.github/scripts/Verify-Links.ps1) that takes
a list of paths as input and tries every link of the files listed out in the path. This script stores the number of broken links in the variable `$badLinks.Count`.

For more information, you can read the script and the parameter descriptions in the `*.ps1` file.

## The GitHub action

We use a different GitHub action for each repository that we want to scan. The general schema of the GitHub action is:

1. A trigger event happens (in our case a push to the "live" branch).
1. An Ubuntu instance is created that runs several commands in a Powershell console:
    1. Checkouts to the relevant repositories.
    2. Runs the `Get-ChildItem` cmdlet to generate the desired list of paths for the scan and stores it in the variable `$urls`.
    3. Runs the script `Verify-Links.ps1` using the variable `$urls` to scan the desired files.

The script `Verify-Links.ps1` exits the variable `$badLinks.Count`. This means that if `$badLinks.Count==0` the script will exit `0` and the GitHub action will succeed.
If there's any broken link in the repository `$badLinks.Count` will be different of `0` and the script will exit a number different of `0`, causing the GitHub action to fail.

### The GitHub action for `quantum-docs-private`

You can find the GitHub action to scan the `quantum-docs-private` repo [here](https://github.com/MicrosoftDocs/quantum-docs-private/blob/quantum-docs-scan/.github/workflows/broken-links-quantum-docs.yml).
The `YAML` commands for the action are:

```
name: Broken links scan of quantum-docs
on:
  push:
    branches:
    - live
  

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - name: Run broken link scanner
      run: |
       $urls = (Get-ChildItem -include *.md, *.yml -exclude -Attributes !Directory -Path ./ -Recurse | ? { $_.FullName -inotmatch 'language' })
       .\.github\scripts\Verify-Links.ps1 -urls $urls -recursive $false -ignoreLinksFile ".\ignorelinks.txt"
       
      
      shell: pwsh
```

Comments:

- We use the parameters of the `Get-ChildItem` cmdlet to curate the list of paths. You can use alternative the parameters of the `Verify-Links.ps1` script. 
- We removed some links from the list to avoid false-positives:
    - All the files from the [`user-guide\language`](https://github.com/MicrosoftDocs/quantum-docs-private/tree/main/articles/user-guide/language) directory. The content of those files is not stored in our repository and is maintained by other team. Also, the script flags the include links of the stub files as broken links.
    - The file [`ignorelinks.txt`](https://github.com/MicrosoftDocs/quantum-docs-private/blob/quantum-docs-scan/.github/scripts/ignorelinks.txt) contains links to be ignored, for example links to private repositories, since the program flags them as 404. Also the link https://ionq.com/best-practices as it was giving a false 404 of unknown origin. 

> 📝
> For more information on the `Get-ChildItem` cmdlet, visit the [official documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem?view=powershell-7.1)

### The GitHub action for `MicrosoftDocs\learn-pr\learn-pr\quantum`

You can find the GitHub action to scan the `MicrosoftDocs\learn-pr\learn-pr\quantum` directory [here](https://github.com/MicrosoftDocs/quantum-docs-private/blob/main/.github/workflows/broken-links-MSLearn.yml).
The `YAML` commands for the action are:

```
name: Broken link scan of MS Learn quantum
on:
  push:
    branches:
    - live
  

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Checkout local repo
      uses: actions/checkout@v2
      with:
        path: main
    - name: Checkout learn repo
      uses: actions/checkout@v2
      with:
        repository: MicrosoftDocs/learn-pr
        token: ${{ secrets.ACCESS_TOKEN }}
        path: learn-pr
    - name: Run broken link scanner
      run: |
       $urls = (Get-ChildItem -include *.md, *.yml -Attributes !Directory -Path ./learn-pr/learn-pr/quantum -Recurse)
       .\main\.github\scripts\Verify-Links.ps1 -urls $urls -rootUrl https://docs.microsoft.com -recursive $false
        
      shell: pwsh
```

Comments:

- In this action we need to access two different repositories, so the structure is slightly different. We use the GH action [actions/checkout@v2](https://github.com/actions/checkout) to handle multiple repos and we specify relative path to root for each repo.
- The **MicrosoftDocs\learn-pr** repo is a private with a SSO authentication protocol, so in order for the Ubuntu instance to access the repo we need to set a Personal Access Token with access to private repositories and grant it *MicrosofDocs* SSO authentication privileges. This token is added to the Secrets of the quantum-docs-private repository. Currently the token uses @KittyYeungQ credentials.
- Microsoft Learn uses relative links with rootUrl `https://docs.microsoft.com`. To scan correctly those links we just need to add it to the parameters of the `Verify-Links.ps1` script. 

## How to use it

The broken links scan will trigger each time that a commit is pushed to the `live` branch of this repo. The scan currently takes around 5min to complete. In order to see the results of the scan you need to go to the branch `live` in the GitHub web client.

![image](https://user-images.githubusercontent.com/48300381/116709755-47a22600-a9d1-11eb-9ba4-adb66eb1cc83.png)

If there is a green checkmark (:heavy_check_mark:) it means that all the GH Actions succeeded and no link is broken.

If there is a broken link, a red cross (:x:) will appear. To find the broken links click on the :x: and see which GH action failed.

![image](https://user-images.githubusercontent.com/48300381/116713347-fd22a880-a9d4-11eb-8403-773c13089955.png)

Click on `Details` of failed check(s) to go to the GH Action register. 

![image](https://user-images.githubusercontent.com/48300381/116713656-4a9f1580-a9d5-11eb-9a9f-5386a068bf8c.png)

Under `Run broken links scanner` you will find the output of the script and a summary report for the broken links that the program found.
