---
layout: blog-post
title: Announcing Ballerina 2201.1.0 (Swan Lake Update 1)
author: Ballerina Team
published-date: 30 May 2022
status: Published
socialmediaimage: Ballerina-Swan-Lake-GA-Release-banner-02-with-button.png
permalink: /posts/2022-05-30-announcing-ballerina-2201.1.0-swan-lake-update-1/
---

<style>.cBlogContent p{white-space: break-spaces !important;}</style>

We are happy to announce a new release, [Ballerina 2201.1.0 (Swan Lake Update 1)](https://ballerina.io/downloads/), the first update release of Ballerina Swan Lake. 

The highlight of this update release is that it comes with brand new tools for generating GraphQL clients and AsyncAPI service skeletons, and other improvements to the existing tools. The [Ballerina GraphQL tool](https://ballerina.io/learn/graphql-client-tool/) allows generating a client in Ballerina when a [GraphQL](https://spec.graphql.org/October2021/) schema (SDL) and GraphQL queries are provided. The [Ballerina AsyncAPI tool](https://ballerina.io/learn/asyncapi-tool/) lets you create an event API in Ballerina using an [AsyncAPI](https://www.asyncapi.com/docs/specifications/v2.0.0) contract by generating Ballerina service and listener skeletons. The OpenAPI Tool also comes with several improvements, most notably the improved OpenAPI service validator.

In terms of language improvements,

- We introduced the spread operator `...x` support for the list constructor expression. Previously, the spread operator `...x` was allowed only in function call expressions and mapping constructor expressions. 

- The `*`, `/`, and `%` operators now allow operands to mix numeric types in specific cases: `*` allows the case where either operand is an `int`; `/` and `*` allow the case where the right operand is an `int`. The type of the resulting expression will be the floating-point type. 

- And in terms of improvements to the language library, `lang.array`, `lang.decimal` and `lang.float` have been significantly improved by introducing new functions. 

The Ballerina standard library also went through multiple significant enhancements:

- The `http` module now comes with interceptors. Interceptors typically perform small tasks such as logging, header manipulation, state publishing, etc., before resources are invoked. Interceptors could be engaged in the form of request interceptors or response interceptors. As the names suggest, a request interceptor is engaged for inbound requests, whereas the response interceptor is engaged for outbound responses. Error handlers have been introduced to catch any errors returned by the main service, interceptors, dispatchers, data-binders, security handlers, etc.

- To provide an easy way to test the Ballerina GraphQL APIs locally, we integrated GraphiQL into the `graphql` module. GraphiQL provides a graphical user interface to execute the GraphQL queries. In addition, documentation support is introduced to the `graphql` module. Now the relevant code level documentation is reflected in the GraphQL schema.

- Additionally, the `ftp`, `os`, and `regex` modules also come with new capabilities. The `ftp` module was improved to support passing `ftp:Caller` as an argument to the `onFileChange` method  and to the compiler plugin, and support code snippet generation with/without `ftp:Caller`. The `os` module, which provides APIs to retrieve information about the environment variables and the current users of the operating system, now allows users to also set and unset environment variables programmatically. With this update, users can now extract a substring from a given string using the `regex` module. Previously, users didn’t have a way to extract a substring/s from the given string. 

The extended library went through the following changes: 

- Data binding support was introduced to `ballerinax/kafka`, `ballerinax/nats`, `ballerinax/rabbitmq`, and `ballerinax/websocket` modules to improve the user experience by allowing the user to access the incoming and outgoing message data in the user's desired type. Similar to the `lang.http` module, subtypes of anydata will be the supported types.

- The [`ballerinax/awslambda`](https://central.ballerina.io/ballerinax/awslambda) and [`ballerinax/azure_function`](https://central.ballerina.io/ballerinax/azure_functions) modules have been added to Ballerina Central.

With improvements to the language server, code completion and code action capabilities are now available for the modules pulled from Ballerina Central, thus improving the user experience when working with external modules. Code action improvements were done to further support Ballerina language constructs—`document this code` action to support module-level variables, `create function` code action to handle named arguments, and `create function` code action to add an isolated qualifier. Displaying the function or method signature was extended for record parameters and union-typed expressions. Other improvements were done to provide context-sensitive code suggestions.

Another notable upgrade in developer tools is that the debugger now comes with support for runtime breakpoint verification. With this improvement, the debugger verifies all the valid breakpoint locations in the current debug source. All the breakpoints set on non-executable lines of code, i.e., line comments, documentation, blank lines, and declarations, will be marked as unverified in the editor.

Concerning runtime improvements, configurable variables are now improved such that values can be provided via in-line tables, and tuple types are supported in configurable variables through TOML syntax. The configurable variables also support union types through CLI arguments.

We made more changes in this release, including many bug fixes to the compiler, runtime, standard library, and developer tools. See the [release note](http://ballerina.io/downloads/swan-lake-release-notes/2201.1.0/) for all the details of this release. 

We want to extend our sincerest thanks to the Ballerina community for your valuable feedback and support in making Ballerina what it is today. We hope you enjoy this release. 

Happy coding! 

Cheers, 
The Ballerina Team
     
