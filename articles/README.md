# Quantum Development Kit documentation

In this directory you can find the documentation for the Quantum
Development Kit (QDK). This directory contains:

- **Articles directories**: contain the articles for each section of
  the documentation. In these directories you can find the following contents:
  
  - Every directory contains a `toc.yml` file to display the content of the directory
    in the main Table Of Contents (TOC).
  - Markdown articles that contain the documentation. These articles
    should follow the guidelines of the [Microsoft Docs contributor
    guide](xref:microsoft.quantum.contributing-qdk.overview).
  - Articles sub-directories. These
    sub-directories should also contain their own `toc.yml` file.

    > :pencil: Although it's possible to refer the `*.md` files directly in the parent `TOC.yml` file, to keep things ordered we only refer them from the `toc.yml` of their current directory.

- **Main table of contents (TOC) `TOC.yml` file**: in this file the sections of
  the website TOC are listed together with the reference to the main `toc.yml`
  file of the directory of each section.
- **`index.yml`** YAML with the configuration of the landing page of the documentation.
- **`\media`**: A directory to store all the images used in the documentation. It
  contains a `\media\src` subdirectory to store source files of the images.
- **License files**: files containing legal licenses
- **Technical files**: files containing macros and metadata.

## Guidelines

Some general guidelines about the organization of this directory
for contributors:

- Every directory or sub-directory should contain its own `toc.yml` file in
  which are referred the same-level articles or the `toc.yml` files of its child directories.
- The organization of the directories of the repository should be as close as possible to the
  organization of the table of contents of the documentation website.
- All the images should be stored in `articles\media` and not in the articles
  folder.
- The titles of the articles, the names in the TOC and the *uid* of the metadata
  should be as close as possible among them and represent clearly the H1 header
  of the Markdown document.
  
## Broken links prevention

The URL of an article page on Microsoft Docs is generated from the relative path to the **articles** folder on the GitHub repository where the source files are stored. For example, the article located at `https://github.com/MicrosoftDocs/quantum-docs/blob/main/articles/user-guide/programs.md` is assigned the URL `https://docs.microsoft.com/azure/quantum/user-guide/programs`. This means that any time you change an article's path, either because of a relocation, deletion, or change in the file name, the URL will change accordingly. If you don't redirect the original link to a working page, customers that have bookmarked the original article, and other pages that link to the original article, will get a **404 Page not found** error. To avoid this:

- If possible, do not rename or relocate articles.
- If you need to rename, remove or relocate an article, you must add a *redirect* from the previous article location to the URL of the new article to avoid creating  broken links.

### Redirects

A redirect captures a customer's request to a non-existent or outdated web location and redirects it to a working page, preventing **404 Page not found** errors. For example, if a customer has bookmarked the article  *<https://docs.microsoft.com/azure/quantum/old-article>*, a redirect can capture that URL and automatically redirect the user to *<https://docs.microsoft.com/azure/quantum/new-article>*.

At the root of every repository there is a file named **.openpublishing.redirection.json**, which contains a `redirections` array:

```json
{
    "redirections": [
        {"redirect entry"},
        {"redirect entry"},
        {"redirect entry"},
    ]
}
```

Each entry in the array contains the source path of an article being redirected, a relative URL of a new target location, and whether or not to keep the file's history.

```json
        {
            "source_path": "articles/folder/old-article.md",
            "redirect_url": "/azure/quantum/new-article#section-about-old-topic",
            "redirect_document_id": false
        },
        {
            "source_path": "articles/folder/renamed-article.md",
            "redirect_url": "/azure/quantum/new-named-article#section-about-old-topic",
            "redirect_document_id": true
        }
```

### How to create a redirect

To create a redirect, you need to add an entry to the [.openpublishing.redirection.json](https://github.com/MicrosoftDocs/quantum-docs/blob/main/.openpublishing.redirection.json) file and create a Pull Request.

1. Open the [.openpublishing.redirection.json](https://github.com/MicrosoftDocs/quantum-docs/blob/main/.openpublishing.redirection.json) file for editing.
2. Add an entry to the `redirections` array.

    - **source_path** is the relative repository path (relative to the root of the repository, *<https://github.com/MicrosoftDocs/quantum-docs/>*) to the old article that you're removing or renaming. Be sure the path starts with **articles** and ends with **.md**. A majority of our files live in the root **/articles** folder, so the path would be **articles/old-article.md**. If the file lives in a sub-folder, indicate the folder in the path, for example, **articles/user-guide/old-article.md**.
      > :pencil: Verify that **source_path** is unique in the **.openpublishing.redirection.json** file. Multiple source_paths can redirect to a single target URL, but a single source_path cannot redirect to multiple targets.
    - **redirect_url** is the relative public URL to the new article (relative to *<https://docs.microsoft.com/azure/quantum/>*). Be sure that this URL **does not** end in **.md**, as it refers to the public URL and not the repository path. Linking to a section within the new article using `#section` is allowed, for example, **/azure/quantum/new-article#specific-section**. You can also use an absolute path to another site, for example, *<https://azure.microsoft.com/services/quantum/>*.
    - **redirect_document_id** indicates whether to keep the document ID from the previous file. When set to **true**, you preserve the document ID, and data, such as page views and rankings, is transferred to the target article. Do this if the redirect is primarily a rename, and not a pointer to different article that only covers some of the same content.
      > :pencil: If there are multiple redirect entries that go to the same target (for example, three old articles were merged into one new article), **redirect_document_id** can only be **true** for **one** of the entries.

3. Save the file and submit a Pull Request to be reviewed and merged.

### Important

To prevent build errors that may delay the implementation of the redirect:

- When you add a redirect, be sure to remove the old file as well.
- Follow the formatting of the examples, ensuring that each entry is contained within braces { }, and that each entry is separated by a comma.
- Do not include locale codes (for example, **en-us** or **fr-fr**) in the redirect_url for relative or absolute paths.

## Adding images

To have the images rendering properly in dark mode you must avoid transparencies.

- For `*.jpg` files you don't need to do anything since the file format doesn't support transparent elements.
- For `*.png` files you must add a white background or change the value of the alpha channel to 100. The easiest way to do this in Windows is by opening the file in Paint and saving, overwriting the original file.
- For `*.svg` files you must add a white rectangle in the lowest layer. You can do this with Inkscape:
  - Open the `*.svg` file.
  - Select the square maker tool and draw a white rectangle on top of the original figure.
  - Select the tool "Select and transform objects" by clicking in the dark arrow or pressing F1.
  - While having the rectangle selected, click in the toolbar element "Lower selection to bottom (End)".
  - Adjust the rectangle with the mouse or the arrow keys.
