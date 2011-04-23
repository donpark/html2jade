# html2jade #

`html2jade` converts HTML into [Jade](https://github.com/visionmedia/jade) format.

## Install ##

Until NPM packaging is done, use `git clone`:

## Usage ##

    node app.js {url or path}

or if you have CoffeeScript

    coffee app.coffee {url or path}

## Status ##

Very raw, spent-only-a-few-hours raw. But I'm going to be using this for work so you can expect improvements as I discover problems while using. Pull requests are welcome.

## Example ##

    node app.js https://github.com/donpark/html2jade
    
returns

    html
      head
        meta(charset='utf-8')
        meta(http-equiv='X-UA-Compatible', content='chrome=1')
        title donpark/html2jade - GitHub
        link(rel='search', type='application/opensearchdescription+xml', href='/opensearch.xml', title='GitHub')
        link(rel='fluid-icon', href='https://github.com/fluidicon.png', title='GitHub')
        link(href='https://d3nwyuy0nl342s.cloudfront.net/a4097a7412ef3782c5ac606b00f9affb36193394/stylesheets/bundle_common.css', media='screen', rel='stylesheet', type='text/css')
        link(href='https://d3nwyuy0nl342s.cloudfront.net/a4097a7412ef3782c5ac606b00f9affb36193394/stylesheets/bundle_github.css', media='screen', rel='stylesheet', type='text/css')
        script(type='text/javascript')
                if (typeof console == "undefined" || typeof console.log == "undefined")
                  console = { log: function() {} }

        script(type='text/javascript', charset='utf-8')
                var GitHub = {
                  assetHost: 'https://d3nwyuy0nl342s.cloudfront.net'
                }
                var github_user = null


        script(src='https://d3nwyuy0nl342s.cloudfront.net/a4097a7412ef3782c5ac606b00f9affb36193394/javascripts/jquery/jquery-1.4.2.min.js', type='text/javascript')
        script(src='https://d3nwyuy0nl342s.cloudfront.net/a4097a7412ef3782c5ac606b00f9affb36193394/javascripts/bundle_common.js', type='text/javascript')
        script(src='https://d3nwyuy0nl342s.cloudfront.net/a4097a7412ef3782c5ac606b00f9affb36193394/javascripts/bundle_github.js', type='text/javascript')
        script(type='text/javascript', charset='utf-8')
                GitHub.spy({
                  repo: "donpark/html2jade"
                })

        link(href='https://github.com/donpark/html2jade/commits/master.atom', rel='alternate', title='Recent Commits to html2jade:master', type='application/atom+xml')
        meta(name='description', content='html2jade - converts HTML to Jade template')
        script(type='text/javascript')
                GitHub.nameWithOwner = GitHub.nameWithOwner || "donpark/html2jade";
                GitHub.currentRef = 'master';
                GitHub.commitSHA = "fb7e76d58816a07f9b6cca94af4316aa2b4503d8";
                GitHub.currentPath = '';
                GitHub.masterBranch = "master";

                  GitHub.currentTreeSHA = "fb7e76d58816a07f9b6cca94af4316aa2b4503d8";


        script(type='text/javascript')
                var _gaq = _gaq || [];
                _gaq.push(['_setAccount', 'UA-3769691-2']);
                _gaq.push(['_setDomainName', 'none']);
                _gaq.push(['_trackPageview']);
                (function() {
                  var ga = document.createElement('script');
                  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                  ga.setAttribute('async', 'true');
                  document.documentElement.firstChild.appendChild(ga);
                })();

      body.logged_out.
        #main.subnavd
          #header.true
            a.logo.boring(href='https://github.com')
              img.default(alt='github', src='https://d3nwyuy0nl342s.cloudfront.net/images/modules/header/logov3.png')
              /if (gt IE 8)|!(IE)
              img.hover(alt='github', src='https://d3nwyuy0nl342s.cloudfront.net/images/modules/header/logov3-hover.png')
              //<![endif]
            .topsearch
              ul.nav.logged_out
                li.pricing
                  a(href='/plans') Pricing and Signup
                li.explore
                  a(href='/explore') Explore GitHub
                li.features
                  a(href='/features') Features
                li.blog
                  a(href='/blog') Blog
                li.login
                  a(href='/login?return_to=https://github.com/donpark/html2jade') Login
          .site
            .pagehead.repohead.vis-public.instapaper_ignore.readability-menu
              .title-actions-bar
                h1
                  a(href='/donpark') donpark
                  | /
                  strong
                    a(href='https://github.com/donpark/html2jade') html2jade
                ul.actions
                  li.for-owner(style='display:none')
                    a.minibutton.btn-admin.(href='https://github.com/donpark/html2jade/admin')
                      span
                        span.icon
                        | Admin
                  li
                    a#watch_button.minibutton.btn-watch.(href='/donpark/html2jade/toggle_watch', onclick='var f = document.createElement(\'form\'); f.style.display = \'none\'; this.parentNode.appendChild(f); f.method = \'POST\'; f.action = this.href;var s = document.createElement(\'input\'); s.setAttribute(\'type\', \'hidden\'); s.setAttribute(\'name\', \'authenticity_token\'); s.setAttribute(\'value\', \'36096908add703cbcc63e09b119ff3ef6e2bb1b7\'); f.appendChild(s);f.submit();return false;', style='display:none')
                      span
                        span.icon
                        | Watch
                    a#unwatch_button.minibutton.btn-watch.(href='/donpark/html2jade/toggle_watch', onclick='var f = document.createElement(\'form\'); f.style.display = \'none\'; this.parentNode.appendChild(f); f.method = \'POST\'; f.action = this.href;var s = document.createElement(\'input\'); s.setAttribute(\'type\', \'hidden\'); s.setAttribute(\'name\', \'authenticity_token\'); s.setAttribute(\'value\', \'36096908add703cbcc63e09b119ff3ef6e2bb1b7\'); f.appendChild(s);f.submit();return false;', style='display:none')
                      span
                        span.icon
                        | Unwatch
                  li.for-notforked(style='display:none')
                    a#fork_button.minibutton.btn-fork.(href='/donpark/html2jade/fork', onclick='var f = document.createElement(\'form\'); f.style.display = \'none\'; this.parentNode.appendChild(f); f.method = \'POST\'; f.action = this.href;var s = document.createElement(\'input\'); s.setAttribute(\'type\', \'hidden\'); s.setAttribute(\'name\', \'authenticity_token\'); s.setAttribute(\'value\', \'36096908add703cbcc63e09b119ff3ef6e2bb1b7\'); f.appendChild(s);f.submit();return false;')
                      span
                        span.icon
                        | Fork
                  li.for-hasfork(style='display:none')
                    a#your_fork_button.minibutton.btn-fork.(href='#')
                      span
                        span.icon
                        | Your Fork
                  li.repostats
                    ul.repo-stats
                      li.watchers
                        a.tooltipped.downwards(href='/donpark/html2jade/watchers', title='Watchers') 1
                      li.forks
                        a.tooltipped.downwards(href='/donpark/html2jade/network', title='Forks') 1
              ul.tabs
                li
                  a.selected(href='https://github.com/donpark/html2jade', highlight='repo_source') Source
                li
                  a(href='https://github.com/donpark/html2jade/commits/master', highlight='repo_commits') Commits
                li
                  a(href='/donpark/html2jade/network', highlight='repo_network') Network
                li
                  a(href='/donpark/html2jade/pulls', highlight='repo_pulls') Pull Requests (0)
                li
                  a(href='/donpark/html2jade/issues', highlight='issues') Issues (0)
                li
                  a(href='/donpark/html2jade/graphs', highlight='repo_graphs') Graphs
                li.contextswitch.nochoices
                  span.toggle.leftwards
                    em Branch:
                    code master
              #pl-description(style='display:none')
                p
                  em.placeholder click here to add a description
              #pl-homepage(style='display:none')
                p
                  em.placeholder click here to add a homepage
              .subnav-bar
                ul
                  li
                    a.dropdown(href='/donpark/html2jade/branches') Switch Branches (1)
                    ul
                      li
                        strong master ✓
                  li
                    a.dropdown.(href='#') Switch Tags (1)
                    ul
                      li
                        a(href='/donpark/html2jade/tree/0.0.1') 0.0.1
                  li
                    a.manage(href='/donpark/html2jade/branches') Branch List
              #repo_details.metabox.clearfix
                #repo_details_loader.metabox-loader(style='display:none') Sending Request&hellip;
                a#download_button.download-source(href='/donpark/html2jade/downloads', title='Download source, tagged packages and binaries.')
                  span.icon
                  | Downloads
                #repository_desc_wrapper
                  #repository_description(rel='repository_description_edit')
                    p
                      | converts HTML to Jade template
                      span#read_more(style='display:none')
                        | &mdash;
                        a(href='#readme') Read more
                  #repository_description_edit.inline-edit(style='display:none;')
                    form(action='/donpark/html2jade/admin/update', method='post')
                      div(style='margin:0;padding:0')
                        input(name='authenticity_token', type='hidden', value='36096908add703cbcc63e09b119ff3ef6e2bb1b7')
                      input(type='hidden', name='field', value='repository_description')
                      input.textfield(type='text', name='value', value='converts HTML to Jade template')
                      .form-actions
                        button.minibutton
                          span Save
                        a.cancel(href='#') Cancel
                  #repository_homepage.repository-homepage(rel='repository_homepage_edit')
                    p
                      a(href='http://', rel='nofollow')
                  #repository_homepage_edit.inline-edit(style='display:none;')
                    form(action='/donpark/html2jade/admin/update', method='post')
                      div(style='margin:0;padding:0')
                        input(name='authenticity_token', type='hidden', value='36096908add703cbcc63e09b119ff3ef6e2bb1b7')
                      input(type='hidden', name='field', value='repository_homepage')
                      input.textfield(type='text', name='value')
                      .form-actions
                        button.minibutton
                          span Save
                        a.cancel(href='#') Cancel
                .rule.
                #url_box.url-box
                  ul.clone-urls
                    li#http_clone_url
                      a(href='https://github.com/donpark/html2jade.git', data-permissions='Read-Only') HTTP
                    li#public_clone_url
                      a(href='git://github.com/donpark/html2jade.git', data-permissions='Read-Only') Git Read-Only
                  input#url_field.url-field(type='text', spellcheck='false')
                  span#url_box_clippy(style='display:none')
                  span#clippy_tooltip_url_box_clippy.clippy-tooltip.tooltipped(title='copy to clipboard')
                    object#clippy.clippy(classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000', width='14', height='14')
                      param(name='movie', value='https://d3nwyuy0nl342s.cloudfront.net/flash/clippy.swf?v5')
                      param(name='allowScriptAccess', value='always')
                      param(name='quality', value='high')
                      param(name='scale', value='noscale')
                      param(name='FlashVars', value='id=url_box_clippy&amp;copied=&amp;copyto=')
                      param(name='bgcolor', value='#FFFFFF')
                      param(name='wmode', value='opaque')
                      embed(src='https://d3nwyuy0nl342s.cloudfront.net/flash/clippy.swf?v5', width='14', height='14', name='clippy', quality='high', allowscriptaccess='always', type='application/x-shockwave-flash', pluginspage='http://www.macromedia.com/go/getflashplayer', flashvars='id=url_box_clippy&amp;copied=&amp;copyto=', bgcolor='#FFFFFF', wmode='opaque')
                  p#url_description
                    | This URL has
                    strong Read+Write
                    | access
              .frame.frame-center.tree-finder(style='display:none')
                .breadcrumb
                  b
                    a(href='/donpark/html2jade') html2jade
                  | /
                  input.tree-finder-input(type='text', name='query', autocomplete='off', spellcheck='false')
                .octotip
                  p
                    a.dismiss.js-dismiss-tree-list-help(href='/donpark/html2jade/dismiss-tree-finder-help', title='Hide this notice forever') Dismiss
                    strong Octotip:
                    | You've activated the
                    em file finder
                    | by pressing
                    span.kbd t
                    | Start typing to filter the file list. Use
                    span.kbd.badmono ↑
                    | and
                    span.kbd.badmono ↓
                    | to navigate,
                    span.kbd enter
                    | to view files.
                table.tree-browser(cellpadding='0', cellspacing='0')
                  tr.js-header
                    th  
                    th name
                  tr.js-no-results.no-results(style='display: none')
                    th(colspan='2') No matching files
                  tbody.js-results-list
              #jump-to-line(style='display:none')
                h2 Jump to Line
                form
                  input.textfield(type='text')
                  .full-button
                    button.classy(type='submit')
                      span Go
            // /.pagehead 
            script(type='text/javascript')
                GitHub.downloadRepo = '/donpark/html2jade/archives/master'
                GitHub.revType = "master"
                GitHub.controllerName = "tree"
                GitHub.actionName     = "show"
                GitHub.currentAction  = "tree#show"


            #commit
              .group
                .envelope.commit
                  .human
                    .message
                      pre

                    .actor
                      .gravatar
                        img(src='https://secure.gravatar.com/avatar/88f2ee32d146425a422f58f8eab5424b?s=140&d=https://d3nwyuy0nl342s.cloudfront.net%2Fimages%2Fgravatars%2Fgravatar-140.png', width='30', height='30')
                      .name
                        a(href='/donpark') donpark
                        span (author)
                      .date
                        abbr.relatize(title='2011-04-23 08:28:34') Sat Apr 23 08:28:34 -0700 2011
                  .machine
                    span c
                    | ommit
                    a(href='/donpark/html2jade/commit/fb7e76d58816a07f9b6cca94af4316aa2b4503d8', hotkey='c') fb7e76d58816a07f9b6c
                    br
                    span t
                    | ree
                    a(href='/donpark/html2jade/tree/fb7e76d58816a07f9b6cca94af4316aa2b4503d8', hotkey='t') 3987b71098d0c7f2b968
                    br
            #slider
              .breadcrumb(data-path='/')
                b
                  a(href='/donpark/html2jade/tree/fb7e76d58816a07f9b6cca94af4316aa2b4503d8') html2jade
                | /
              .frames
                .frame.frame-center(data-path='/')
                  table.tree-browser(cellpadding='0', cellspacing='0')
                    tr.header
                      th
                      th name
                      th age
                      th
                        .history
                          a(href='/donpark/html2jade/commits/master/') history
                        | message
                    tr.alt
                      td.icon
                        img(alt='file', height='16', src='https://d3nwyuy0nl342s.cloudfront.net/images/icons/txt.png', width='16')
                      td.content
                        a#40d670c45c4905de630225c53653f4273ca46072.js-slide-to(href='/donpark/html2jade/blob/fb7e76d58816a07f9b6cca94af4316aa2b4503d8/README.md') README.md
                      td.age
                        span.relatize Sat Apr 23 08:28:34 -0700 2011
                      td.message
                        a.message(href='/donpark/html2jade/commit/fb7e76d58816a07f9b6cca94af4316aa2b4503d8') first cut
                        | [
                        a(href='/donpark') donpark
                        | ]
                    tr.
                      td.icon
                        img(alt='file', height='16', src='https://d3nwyuy0nl342s.cloudfront.net/images/icons/txt.png', width='16')
                      td.content
                        a#a93016edcea62b6f0cbb075f81a43851fc1df25d.js-slide-to(href='/donpark/html2jade/blob/fb7e76d58816a07f9b6cca94af4316aa2b4503d8/app.coffee') app.coffee
                      td.age
                        span.relatize Sat Apr 23 08:28:34 -0700 2011
                      td.message
                        a.message(href='/donpark/html2jade/commit/fb7e76d58816a07f9b6cca94af4316aa2b4503d8') first cut
                        | [
                        a(href='/donpark') donpark
                        | ]
                    tr.alt
                      td.icon
                        img(alt='file', height='16', src='https://d3nwyuy0nl342s.cloudfront.net/images/icons/txt.png', width='16')
                      td.content
                        a#29706212352f88365bb3c82056d71ca9b463b765.js-slide-to(href='/donpark/html2jade/blob/fb7e76d58816a07f9b6cca94af4316aa2b4503d8/app.js') app.js
                      td.age
                        span.relatize Sat Apr 23 08:28:34 -0700 2011
                      td.message
                        a.message(href='/donpark/html2jade/commit/fb7e76d58816a07f9b6cca94af4316aa2b4503d8') first cut
                        | [
                        a(href='/donpark') donpark
                        | ]
                    tr.
                      td.icon
                        img(alt='file', height='16', src='https://d3nwyuy0nl342s.cloudfront.net/images/icons/txt.png', width='16')
                      td.content
                        a#c84ff38beea72557aae033d546cdf2d58b516411.js-slide-to(href='/donpark/html2jade/blob/fb7e76d58816a07f9b6cca94af4316aa2b4503d8/html2jade.coffee') html2jade.coffee
                      td.age
                        span.relatize Sat Apr 23 08:28:34 -0700 2011
                      td.message
                        a.message(href='/donpark/html2jade/commit/fb7e76d58816a07f9b6cca94af4316aa2b4503d8') first cut
                        | [
                        a(href='/donpark') donpark
                        | ]
                    tr.alt
                      td.icon
                        img(alt='file', height='16', src='https://d3nwyuy0nl342s.cloudfront.net/images/icons/txt.png', width='16')
                      td.content
                        a#55094ed02af6e8382787bc6a417f9dbdb9721afb.js-slide-to(href='/donpark/html2jade/blob/fb7e76d58816a07f9b6cca94af4316aa2b4503d8/html2jade.js') html2jade.js
                      td.age
                        span.relatize Sat Apr 23 08:28:34 -0700 2011
                      td.message
                        a.message(href='/donpark/html2jade/commit/fb7e76d58816a07f9b6cca94af4316aa2b4503d8') first cut
                        | [
                        a(href='/donpark') donpark
                        | ]
              br(style='clear:both;')
              br(style='clear:both;')
              .frame.frame-loading(style='display:none;')
                img(src='https://d3nwyuy0nl342s.cloudfront.net/images/modules/ajax/big_spinner_336699.gif', height='32', width='32')
              #readme.announce.instapaper_body.md(data-path='/')
                span.name README.md
                .wikistyle
                  h1 html2jade
                  p
                    code html2jade
                    | converts HTML into
                    a(href='https://github.com/visionmedia/jade') Jade
                    | format.
                  h2 Install
                  p
                    | Until NPM packaging is done, use
                    code git clone
                    | :
                  h2 Usage
                  pre
                  p or if you have CoffeeScript
                  pre
                  h2 Status
                  p
                    | Very raw, spent-only-a-few-hours raw. But I'm going to be using this for work so
                    | you can expect improvements as I discover problems while using. Pull requests are
                    | welcome.
        #footer.clearfix
          .site
            .sponsor
              a.logo(href='http://www.rackspace.com')
                img(alt='Dedicated Server', height='36', src='https://d3nwyuy0nl342s.cloudfront.net/images/modules/footer/rackspace_logo.png?v2', width='38')
              | Powered by the
              a(href='http://www.rackspace.com ')
                | Dedicated
                | Servers
              | and
              br
              a(href='http://www.rackspacecloud.com')
                | Cloud
                | Computing
              | of Rackspace Hosting
              span ®
            ul.links
              li.blog
                a(href='https://github.com/blog') Blog
              li
                a(href='/login/multipass?to=http%3A%2F%2Fsupport.github.com') Support
              li
                a(href='https://github.com/training') Training
              li
                a(href='http://jobs.github.com') Job Board
              li
                a(href='http://shop.github.com') Shop
              li
                a(href='https://github.com/contact') Contact
              li
                a(href='http://develop.github.com') API
              li
                a(href='http://status.github.com') Status
            ul.sosueme
              li.main
                | © 2011
                span#_rrt(title='0.04092s from fe3.rs.github.com') GitHub
                | Inc. All rights reserved.
              li
                a(href='/site/terms') Terms of Service
              li
                a(href='/site/privacy') Privacy
              li
                a(href='https://github.com/security') Security
        // /#footer 
        // current locale:  
        .locales.instapaper_ignore.readability-footer
          .site
            ul.choices.clearfix.limited-locales
              li
                span.current Hrvatski
              li
                a(rel='nofollow', href='?locale=en') English
              li
                a(rel='nofollow', href='?locale=de') Deutsch
              li
                a(rel='nofollow', href='?locale=fr') Français
              li
                a(rel='nofollow', href='?locale=ja') 日本語
              li
                a(rel='nofollow', href='?locale=pt-BR') Português (BR)
              li
                a(rel='nofollow', href='?locale=ru') Русский
              li
                a(rel='nofollow', href='?locale=zh') 中文
              li.all
                a.minibutton.btn-forward.js-all-locales(href='#')
                  span
                    span.icon
                    | See all available languages
            .all-locales.clearfix
              h3
                | Your current locale selection:
                strong Hrvatski
                | . Choose another?
              ul.choices
                li
                  a(rel='nofollow', href='?locale=en') English
                li
                  a(rel='nofollow', href='?locale=af') Afrikaans
                li
                  a(rel='nofollow', href='?locale=be') Беларуская
                li
                  a(rel='nofollow', href='?locale=ca') Català
                li
                  a(rel='nofollow', href='?locale=cs') Čeština
              ul.choices
                li
                  a(rel='nofollow', href='?locale=de') Deutsch
                li
                  a(rel='nofollow', href='?locale=es') Español
                li
                  a(rel='nofollow', href='?locale=fr') Français
                li
                  a(rel='nofollow', href='?locale=hr') Hrvatski
                li
                  a(rel='nofollow', href='?locale=hu') Magyar
              ul.choices
                li
                  a(rel='nofollow', href='?locale=id') Indonesia
                li
                  a(rel='nofollow', href='?locale=it') Italiano
                li
                  a(rel='nofollow', href='?locale=ja') 日本語
                li
                  a(rel='nofollow', href='?locale=nl') Nederlands
                li
                  a(rel='nofollow', href='?locale=no') Norsk
              ul.choices
                li
                  a(rel='nofollow', href='?locale=pl') Polski
                li
                  a(rel='nofollow', href='?locale=pt-BR') Português (BR)
                li
                  a(rel='nofollow', href='?locale=ru') Русский
                li
                  a(rel='nofollow', href='?locale=sr') Српски
                li
                  a(rel='nofollow', href='?locale=sv') Svenska
              ul.choices
                li
                  a(rel='nofollow', href='?locale=zh') 中文
          .fade
        script
          window._auth_token = "36096908add703cbcc63e09b119ff3ef6e2bb1b7"
        #keyboard_shortcuts_pane.instapaper_ignore.readability-extra(style='display:none')
          h2
            | Keyboard Shortcuts
            small
              a.js-see-all-keyboard-shortcuts(href='#') (see all)
          .columns.threecols
            .column.first
              h3 Site wide shortcuts
              dl.keyboard-mappings
                dt s
                dd Focus site search
              dl.keyboard-mappings
                dt ?
                dd Bring up this help dialog
            // /.column.first 
            .column.middle(style='display:none')
              h3 Commit list
              dl.keyboard-mappings
                dt j
                dd Move selected down
              dl.keyboard-mappings
                dt k
                dd Move selected up
              dl.keyboard-mappings
                dt t
                dd Open tree
              dl.keyboard-mappings
                dt p
                dd Open parent
              dl.keyboard-mappings
                dt
                  | c
                  em or
                  | o
                  em or
                  | enter
                dd Open commit
            // /.column.first 
            .column.last(style='display:none')
              h3 Pull request list
              dl.keyboard-mappings
                dt j
                dd Move selected down
              dl.keyboard-mappings
                dt k
                dd Move selected up
              dl.keyboard-mappings
                dt
                  | o
                  em or
                  | enter
                dd Open issue
            // /.columns.last 
          // /.columns.equacols 
          div(style='display:none')
            .rule
            h3 Issues
            .columns.threecols
              .column.first
                dl.keyboard-mappings
                  dt j
                  dd Move selected down
                dl.keyboard-mappings
                  dt k
                  dd Move selected up
                dl.keyboard-mappings
                  dt x
                  dd Toggle select target
                dl.keyboard-mappings
                  dt
                    | o
                    em or
                    | enter
                  dd Open issue
              // /.column.first 
              .column.middle
                dl.keyboard-mappings
                  dt I
                  dd Mark selected as read
                dl.keyboard-mappings
                  dt U
                  dd Mark selected as unread
                dl.keyboard-mappings
                  dt e
                  dd Close selected
                dl.keyboard-mappings
                  dt y
                  dd Remove selected from view
              // /.column.middle 
              .column.last
                dl.keyboard-mappings
                  dt c
                  dd Create issue
                dl.keyboard-mappings
                  dt l
                  dd Create label
                dl.keyboard-mappings
                  dt i
                  dd Back to inbox
                dl.keyboard-mappings
                  dt u
                  dd Back to issues
                dl.keyboard-mappings
                  dt /
                  dd Focus issues search
          div(style='display:none')
            .rule
            h3 Network Graph
            .columns.equacols
              .column.first
                dl.keyboard-mappings
                  dt
                    span.badmono ←
                    em or
                    | h
                  dd Scroll left
                dl.keyboard-mappings
                  dt
                    span.badmono →
                    em or
                    | l
                  dd Scroll right
                dl.keyboard-mappings
                  dt
                    span.badmono ↑
                    em or
                    | k
                  dd Scroll up
                dl.keyboard-mappings
                  dt
                    span.badmono ↓
                    em or
                    | j
                  dd Scroll down
                dl.keyboard-mappings
                  dt t
                  dd Toggle visibility of head labels
              // /.column.first 
              .column.last
                dl.keyboard-mappings
                  dt
                    | shift
                    span.badmono ←
                    em or
                    | shift h
                  dd Scroll all the way left
                dl.keyboard-mappings
                  dt
                    | shift
                    span.badmono →
                    em or
                    | shift l
                  dd Scroll all the way right
                dl.keyboard-mappings
                  dt
                    | shift
                    span.badmono ↑
                    em or
                    | shift k
                  dd Scroll all the way up
                dl.keyboard-mappings
                  dt
                    | shift
                    span.badmono ↓
                    em or
                    | shift j
                  dd Scroll all the way down
              // /.column.last 
          div
            .rule
            h3 Source Code Browsing
            .columns.threecols
              .column.first
                dl.keyboard-mappings
                  dt t
                  dd Activates the file finder
                dl.keyboard-mappings
                  dt l
                  dd Jump to line
        /if IE 8
            script(type='text/javascript', charset='utf-8')
                    $(document.body).addClass("ie8")

        /if IE 7
            script(type='text/javascript', charset='utf-8')
                    $(document.body).addClass("ie7")

        script(type='text/javascript')
    