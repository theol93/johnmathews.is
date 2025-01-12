---
title: >
  Vim: GoTo Tag Definition
slug: vim-notes-goto-tag-definition
date: "2021-3-31 15:57"
category: Technical>Developer-Tools
tags: ["uncategorized"]
---

## Update (2021-03-31):

Just use neovim.coc instead of YouCompleteMe or Syntastic.

It's faster, easier to setup, and works intuitively. ALE is still wonderful and
useful, though there's a lot of overlap - coc can lint as well.

## Jump Lists and Change Lists

If you're going to be jumping around to where things are defined, you will need
to know how to jump back again. It seems there are two lists you need to be
aware of, the _jump list_[ref]`:help jumplist`[/ref] and the _change
list_[ref]`:help changelist`[/ref].

### Jump List

- A list of locations that the cursor has jumped to.
- `<C-O>` move up the jump list
- `<C-I>` mode down the jump list
- Jumping to a definition, or a search result

### Change List

- `g;` and `g,` → move up and down the change list
- A list of locations where a change was made.
- `'.` → go to the location of your last edit (`.` is a mark).
- `''` → go back to where you were before your last jump

## Original Post:

There are multiple ways of doing anything with vim, including going to where a
function or object is defined, and I usually need to do something at least 3 times
before I can do it without breaking my focus or train of thought.

My memory is hazy but I remember spending a 1/2 day looking into this and
considering which solution I wanted to commit to.[ref]The more powerful the
tool, the more worthwhile it is to take a closer look at what it can and can't
do.[/ref] My options seemed to be between
[YouCompleteMe](https://github.com/ycm-core/YouCompleteMe) and
[ALE](https://github.com/dense-analysis/ale). [Update![ref]YCM and
ALE work fine for goto definition and linting, but they don't give me
satisfactory autocompletion. `neoclide/coc.nvim` looks like it might offer some
improvements.
[neoclide/coc.nvim](https://www.vimfromscratch.com/articles/vim-for-python/)[/ref]]

I can't remember everything I read and tried, but I trust my conclusions.
Looking in my `.vimrc` I see that I have `<leader>x` mapped to `:YcmCompleter GoTo` and it works just fine, even when a module is imported from somewhere
outside the current project. The tool was working and ready to use, I just
hadn't internalized it yet.

## Commands to remember:

- `<Leader>x` - GoTo definition - YCMs best guess at an 'intelligent' goto
  command, whether its a declaration or a definition.
- `<F2>` - Toggle tagbar
