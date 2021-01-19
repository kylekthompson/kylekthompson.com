---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date.Format .Site.Params.DateFormat }}
author: {{ .Site.Params.Author }}
draft: true
---
