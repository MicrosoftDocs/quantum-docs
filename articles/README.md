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

> :pencil: Although it's possible to refer the `*.md` files directly in the parent
> `TOC.yml` file, to keep things ordered we only refer them from the `toc.yml`
> of their current directory.

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

The URL of article pages on `docs.microsoft.com` is generated from the relative path to the `articles` folder on the GitHub repository. For example, the article located at `./articles/user-guide/programs.md` is assigned the URL `https://docs.microsoft.com/azure/quantum/user-guide/programs`. This fact means that each time an article changes its path, either because of a relocation or a change in the file name, the URL will change accordingly. This change can cause some users to find broken links to previously existing articles. To avoid this:

- Try to not rename or re-locate the articles.
- If for some reason you need to rename, remove or relocate an article, you should add a redirect from the previous article to the new URL to avoid creating any broken links.

### How to add a redirect

- To create a redirect you need to add it to the following [`.json` file](https://github.com/MicrosoftDocs/azure-reference-other-pr/blob/master/.openpublishing.redirection.json) by creating a Pull Request.

- To add a redirect to .openpublishing.redirection.json, add an entry to the `redirections` array:

  ```json
  {
      "redirections": [
          {
              "source_path": "articles/folder/old-article.md",
              "redirect_url": "/azure/quantum/new-article#section-about-old-topic",
              "redirect_document_id": false
          },
  ```

  - The `source_path` is the relative repository path to the old article that you're removing. Be sure the path starts with `articles` and ends with `.md`.
  - The `redirect_url` is the relative public URL from the old article to the new article. Be sure that this URL **doesn't** `.md`, as it refers to the public URL and not the repository path. Linking to a section within the new article using `#section` is allowed. You can also use an absolute path to another site here, if necessary.
  - `redirect_document_id` indicates whether you would like to keep the document ID from the previous file. The default is `false`. Use `true` if you want to preserve the `ms.documentid` attribute value from the redirected article. If you preserve the document ID, data, such as page views and rankings, will be transferred to the target article. Do this if the redirect is primarily a rename, and not a pointer to different article that only covers some of the same content.

If you add a redirect, be sure to delete the old file as well.

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
