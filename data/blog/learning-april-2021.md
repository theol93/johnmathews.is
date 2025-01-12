---
title: Learning - April 2021
slug: learning-april-2021
date: "2021-04-21 11:09:19"
category: Technical>Developer-Tools
tags:
  [
    "learning",
    "youtube",
    "ansible",
    "ssh",
    "vagrant",
    "google-cloud-platform",
    "service-accounts",
    "iam",
  ]
---

import IframeEmbed from '../components/IframeEmbed'

Contents:
<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

# [Google Cloud Platform Service Accounts](https://www.youtube.com/playlist?list=PLIivdWyY5sqIlPnZ7cvkg2Ck-8ZZ8TA5t)

It seems like I'm looking for some general overview of how roles are managed,
viewed, compared, and inherited.

How can you tell if a users (or a service accounts) roles are adequate, or
too much or too little for a particular task? And what's the difference
between a user having some roles, and a user using a service account that
has those roles.

It would also be nice to have some kind of adversarial test, that would
identify how/if users or service accounts can create identities with more
flexible permissions that their own.

These short videos are good, but they're not a complete solution. I'm not sure
where to look next.

<IframeEmbed src='https://www.youtube-nocookie.com/embed/xXk1YlkKW_k' />

# [Ansible](https://www.youtube.com/playlist?list=PL2_OBreMn7FplshFCWYlaN2uS8et9RjNG)

Based on Jeff Geerlings book. There are 15 episodes. Jeff seems like a great
guy. I'm going to try listen to one of these each day.

<IframeEmbed src='https://www.youtube-nocookie.com/embed/goclfp6a2IQ' />

# [SSH](https://www.youtube.com/watch?v=hQWRp-FdTpc&list=PLQGMHRkCCyDw5arrPInZT_T8TbDdzmeBp&index=4)

<IframeEmbed src='https://www.youtube-nocookie.com/embed/hQWRp-FdTpc' />

[This](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys)
is also a very useful article. I made notes from it in another [post]({filename}../articles/ssh.md).

# [Vagrant](https://www.youtube.com/watch?v=vBrezgo&list=PLQGMHRkCCyDw5arrPInZT_T8TbDdzmeBp&index=2X)

<IframeEmbed src='https://www.youtube-nocookie.com/embed/vBreXjkizgo' />

- Good for local development. (Especially when on aeroplanes?)
- Not as good for cloud providers as Terraform.
- No more snowflake servers.
