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
       $urls = (Get-ChildItem -include *.md, *.yml -exclude *provider-ionq.md*, *README.md* -Attributes !Directory -Path ./ -Recurse | ? { $_.FullName -inotmatch 'language' })
       .\.github\scripts\Verify-Links.ps1 -urls $urls -recursive $false
       
      
      shell: pwsh
```

Comments:

- We use the parameters of the `Get-ChildItem` cmdlet to curate the list of paths. You can use alternative the parameters of the `Verify-Links.ps1` script. 
  we removed some files from the list to avoid false-positives:
    - [articles\provider-ionq.md](https://github.com/MicrosoftDocs/quantum-docs-private/blob/quantum-docs-scan/articles/provider-ionq.md) because the link https://ionq.com/best-practices 
      was giving a false 404 of unknown origin.
    - All the `README.md` fies, since some of them contain links to private repositories that the program flags as 404, and for example, this one host links that the program falls
      as broken.
    - All the files from the [`user-guide\language`](https://github.com/MicrosoftDocs/quantum-docs-private/tree/main/articles/user-guide/language) directory. The content of those
      files is not stored in our repository and is maintained by other team. Also, the script flags the include files as broken links.

> 📝
> For more information on the `Get-ChildItem` cmdlet, visit the [official documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-childitem?view=powershell-7.1)

### The GitHub action for `MicrosoftDocs\learn-pr\learn-pr\quantum`

In construction...
