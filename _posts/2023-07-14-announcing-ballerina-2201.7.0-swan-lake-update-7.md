---
layout: blog-post
title: Announcing Ballerina 2201.7.0 (Swan Lake Update 7)
author: Ballerina Team
published-date: 14 July 2023
status: Published
socialmediaimage: Ballerina-Swan-Lake-GA-Release-banner-02-with-button.png
permalink: /posts/2023-07-14-announcing-ballerina-2201.7.0-swan-lake-update-7/
---

<style>.cBlogContent p{white-space: break-spaces !important;}</style>

We are excited to announce the [Ballerina 2201.7.0 (Swan Lake Update 7)](https://ballerina.io/downloads/) release, which adds many new features and improvements to the Ballerina programming language. 

The two main highlights of this release are providing support for generating GraalVM native executables and adding aggregation and grouping capabilities to Ballerina query expressions and query actions, which are described below.

## Generating GraalVM native executables

The Swan Lake Update 7 release comes with official support for generating GraalVM native executables for Ballerina. This feature allows you to compile Ballerina programs into standalone native executables.

By leveraging GraalVM native images, Ballerina programs can achieve performance improvements and reduced startup times compared to traditional Java Virtual Machine(JVM) execution. This is particularly beneficial for applications with strict latency requirements or resource-constrained environments.
You can generate a GraalVM native executable for your Ballerina project by executing the command below.

```
$ bal build --graalvm
```

The `--graalvm` flag triggers the GraalVM native image builder, which compiles the Ballerina code and its dependencies into a single, self-contained executable, which contains the modules in the current package, their dependencies, Ballerina runtime, and statically linked native code from the JDK.

For more information on the necessary steps and additional considerations to ensure a successful compilation process of building a native executable with Ballerina and GraalVM, see [Build a GraalVM executable](https://ballerina.io/learn/graalvm-executable-overview/). 

## Aggregating and grouping

The language now supports the features below for query expressions and query actions.

- the `collect` clause to perform aggregating-related operations
- the `group by` clause to perform grouping-related operations

For an example, see [Aggregation](https://ballerina.io/learn/by-example/aggregation/).

### Aggregating

The `collect` clause categorizes a collection into one group as shown in the example below.

```ballerina
import ballerina/io;

type Order record {|
    int orderId;
    string itemName;
    decimal price;
    int quantity;
|};

public function main() returns error? {
    Order[] orders = [
        {orderId: 1, itemName: "Rich Dad Poor Dad", price: 23.4, quantity: 2},
        {orderId: 1, itemName: "Rich Dad Poor Dad", price: 20.4, quantity: 1},
        {orderId: 2, itemName: "Becoming", price: 21.5, quantity: 3},
        {orderId: 1, itemName: "Becoming", price: 21.5, quantity: 3}
    ];

    decimal income = from var {price, quantity} in orders
        let decimal totPrice = price * quantity
        collect sum(totPrice); // The `collect` clause creates a single group and all variables become
                                    // non-grouping keys.

    // Calculate the total income from all the orders.
    io:println(income); // 196.20
}
```

For an example on the usage of aggregating, see [Calculate the total number of deaths](https://ballerina.io/learn/work-with-data-using-queries-in-ballerina/#calculate-the-total-number-of-deaths).

### Grouping

The `group by` clause groups a collection based on a `grouping-key`, which will be unique for each group as shown in the example below.

```ballerina
import ballerina/io;

type Order record {|
    int orderId;
    string itemName;
    decimal price;
    int quantity;
|};

public function main() returns error? {
    Order[] orders = [
        {orderId: 1, itemName: "Rich Dad Poor Dad", price: 23.4, quantity: 2},
        {orderId: 1, itemName: "Rich Dad Poor Dad", price: 20.4, quantity: 1},
        {orderId: 2, itemName: "Becoming", price: 21.5, quantity: 3},
        {orderId: 1, itemName: "Becoming", price: 21.5, quantity: 3}
    ];

    string[][] items = from var {orderId, itemName} in orders
        group by orderId // The `group by` clause creates the groups for each `orderId`.
                         // The `itemName` is a non-grouping key and it becomes a sequence variable.
        select [itemName];

    // List of items per `orderId`.
    io:println(items); // [["Rich Dad Poor Dad","Rich Dad Poor Dad","Becoming"],["Becoming"]]

    record {| string itemName; int quantity;|}[] quantities = from var {itemName, quantity} in orders
        group by itemName // The `group by` clause creates the groups for each `itemName`.
                          // The `quantity` is a non-grouping key and it becomes a sequence variable.
        select {itemName, quantity: sum(quantity)};

    // List of quantity per item.
    io:println(quantities); // [{"itemName":"Rich Dad Poor Dad","quantity":3},{"itemName":"Becoming","quantity":6}]
}
```

For an example on the usage of grouping, see [Group the deaths by the continent](https://ballerina.io/learn/work-with-data-using-queries-in-ballerina/#group-the-deaths-by-the-continent).

Other than these new features, from this release onwards, you can [verify Ballerina artifacts using the Cosign CLI and Rekor APIs](https://ballerina.io/downloads/verify-ballerina-artifacts). Furthermore, this release brings a range of notable additions and improvements to the language, runtime, standard library, and developer tools.

For a comprehensive overview of all the new features and improvements brought by Swan Lake Update 7, see the [release note](https://ballerina.io/downloads/swan-lake-release-notes/swan-lake-2201.7.0).

We encourage our community to explore these features and provide feedback. Your input is invaluable in shaping the future of Ballerina and ensuring it meets your needs.

Cheers to the Ballerina community and the bright future of it!
