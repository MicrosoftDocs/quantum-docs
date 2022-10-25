---
author: bradben
description: Learn how to submit a GitHub pull request to contribute code or documentation to Azure Quantum.
ms.author: brbenefield
ms.date: 09/07/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: contributor-guide
ms.custom: kr2b-contr-experiment
no-loc: ['Q#', '$$v']
title: Opening pull requests for Azure Quantum
uid: microsoft.quantum.contributing-qdk.overview.pulls
---

# Opening pull requests for Azure Quantum contributions

All of the documentation for Azure Quantum is managed using the Git version control system through the use of several repositories hosted on GitHub.
Using Git and GitHub together makes it easy to collaborate widely on Azure Quantum.
In particular, any Git repository can be cloned or forked to make a completely independent copy of that repository.
This allows you to work on your contribution with the tools and at a pace that you prefer.

When you're ready, you can send us a request to include your contribution into our repos, using GitHub's _pull request_ functionality.
The page for each pull request includes details of all the changes that make your contribution, a list of comments on your contribution, and a set of review tools that other members of the community can use to provide feedback and advice.

> [!NOTE]
> While a full tutorial on Git is beyond the scope of this guide, we can suggest the following links for more resources on learning Git:
>
> - [Learn Git](https://www.atlassian.com/git): A set of Git tutorials from Atlassian.
> - [Version Control in Visual Studio Code](https://code.visualstudio.com/docs/editor/versioncontrol): A guide on how to use Visual Studio Code as a GUI for Git.
> - [GitHub Learning Lab](https://lab.github.com/): A set of online courses for using Git, GitHub, and related technologies.
> - [Visualizing Git](https://git-school.github.io/visualizing-git/): An interactive tool for visualizing how Git commands change the state of a repository.
> - [Version Control with Git (EPQIS 2016)](https://nbviewer.jupyter.org/github/QuinnPhys/PythonWorkshop-science/blob/master/lecture-1-scicomp-tools-part1.ipynb#Version-Control-with-Git-(50-Minutes)): A Git tutorial oriented towards scientific computing.
> - [Learn Git Branching](https://learngitbranching.js.org/): An interactive set of branching and rebasing puzzles to help learn new Git features.

## What is a pull request? ##

Having said the above, it's helpful to take a few moments to say what a pull request **is**. In short, you are *requesting* that the admin of the repository *pull* your changes into the repository. 

> [!IMPORTANT]
> For a overall primer on how Git and GitHub work with the Microsoft publishing system, including definitions of terms such as *push*, *pull*, *branch*, *upstream*, and so on, see the [GitHub contribution workflow](/contribute/how-to-write-workflows-major).

When working with Git, any changes are represented as _commits_ that describe how those changes are related to the state of the repository before those changes.
We'll often draw diagrams in which commits are drawn as circles with arrows from previous commits.

Suppose you have started a contribution in a _branch_ called `feature`.
Then your fork of **Microsoft/Quantum** might look something like this:

![Diagram of a working branch diverging from original repo.](./media/git-workflow-step0.png)

If you make your changes in your local repository, you can _pull_ changes from another repository into yours to catch up to any changes that happened upstream.

![Diagram that shows paths for pulling and merging changes from an upstream repo.](./media/git-workflow-step1.png)

Pull requests work the same way, but in reverse: when you open a pull request, you ask for the upstream repository to pull your contribution in.

![Diagram of changes pulled back into the original repo.](./media/git-workflow-step2.png)

When you open a pull request to one of our repositories, GitHub will offer an opportunity for others in the community to see a summary of your changes, to comment on them, and to make suggestions for how to help make an even better contribution.

![Screenshot of a pull request in GitHub.](./media/pull-request-header.png)

Using this process helps us use GitHub functionality to improve contributions and to maintain a high-quality product for the quantum programming community.

## How to make a pull request ##

There are two main ways to make a pull request.  

- For small changes that only affect a single file, the GitHub web interface can be used to make a pull request entirely online. You can access the GitHub web interface by:
  - Navigating to the file in the GitHub repository and selecting the edit icon, or
  - Navigating to the public-facing documentation page on *docs.microsoft.com* and selecting the edit icon. For more information, see [Quick edits to documentation](/contribute/#quick-edits-to-documentation).
- For larger contributions, it's usually easier to *fork* the repository and *clone* it to your local computer to submit pull request. For a step-by-step guide on how to fork and clone a local repository, see [Set up Git repository locally for documentation](/contribute/get-started-setup-local).

<!--
### Using the Web Interface ###

**TODO**

### Command-Line and GitHub Flow ###

Most of the time, it's easier to prepare a pull request on your own computer; that makes it easier to work incrementally, and to test your changes.
If you haven't already done so, the first step is to _fork_ the repository that you'd like to contribute to.
Forking makes a complete clone of the original repository, but under your GitHub account instead of under [Microsoft](http://github.com/Microsoft/) or [MicrosoftDocs](http://github.com/MicrosoftDocs/).
This way, you can edit your personal fork to your heart's content before making a pull request for your work.

**TODO: pick up here**

## Code Review and Etiquette ##

**TODO: PR ettiquette, reviews, etc.**

-->

## Next steps ##

Congratulations on using Git to help out the Azure Quantum community!
To learn more about how to contribute code and samples to Azure Quantum, see the following articles. 

- [Contribute code to the Quantum Development Kit](xref:microsoft.quantum.contributing-qdk.overview.code)
- [Contribute samples to the Quantum Development Kit](xref:microsoft.quantum.contributing-qdk.overview.samples)