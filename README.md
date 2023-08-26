# Service Framework

Assuming a three-tiered top-level architecture consisting of the Presentation Tier, Business Tier, and Infrastructure Tier; The Service Framework stipulates a framework from which all services of the system (that naturally exist in the Business Tier) are derived - as Git forks.

The framework defines structures/boundaries of service code, as well as store/provision code that is common shared between all services i.e. [The Shared Kernel](http://ddd.fed.wiki.org/view/welcome-visitors/view/domain-driven-design/view/shared-kernel).

## How to Use

### Creating a New Service

Each service must have its own repository which will be forked from this repository. As a result, all updates to this framework will be 'pull-able' downstream into all services derived from this framework (it is possible to set up infrastructure for automatic merges).

To create a new service based on this framework, do not use the 'fork' feature of GitHub. Instead, follow these steps:

1. On GitHub, create a new *empty* repository for the service.

2. `git clone` the new repository locally and `cd` into it.

3. Add *the framework repository* as an upstream remote called `service-framework`.:

    ```bash

      git remote add service-framework https://github.com/TejAtParkourOps/sagepress-service-framework

    ```

4. Create a new branch called `framework` whose default upstream/downstream will be the `service-framework`'s `main` branch.

    ```bash

      git fetch service-framework main
      
      git checkout -b framework --track service-framework/main

    ```

5. Create the `main` branch for this service.

    ```bash

      git checkout -b main

      git push -u origin main

    ```

6. Install the Node dependencies and get developing!

    ```bash

      npm install

    ```

## Requirements and Limitations

* All code must exist in a Git repository, as opposed to any other version control system.

* All code must be TypeScript: the framework is not designed for polyglot system implementations. Thankfully there are near endless choices of TypeScript tools, frameworks, and libraries for every layer of the software stack.

* The framework assumes all runtime components will be executed using [ts-node](https://www.npmjs.com/package/ts-node).

* The framework uses [Zod](https://zod.dev/) to define the types of inputs and outputs.

## Architecture

### Methodology / Inspiration

Each service must adhere to [The Twelve-Factor App](https://12factor.net/) methodology published by Heroku co-founder/CTO [Adam Wiggins](https://adamwiggins.com/).
A concise visualisation of the methodology can be found in 'The DZone Guide to Building and Deploying Applications on the Cloud, Volume III' (PDF).
This framework riefies the approach stipulated by the methodology by providing the necessary structural boundaries.

This framework also riefies relevant aspects of the [Explicit Architecture](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/)
designed by the renowned software architect, dev educator and advocate [Herberto Graca](https://herbertograca.com/).

### Rationale

* All business logic exists in the __Application Core,__ a *hard* boundary.
This layer is described as a *hard* boundary because it is completely agnostic of the infrastructure/tooling used by the system to execute business logic, the components that comprise this layer simply expose their specific input and output requirements as ports.

    Components of the Application Core may expose two types of ports:

  * __Primary Ports:__ The purpose of these ports is to expose triggers to use-case-specific actions (a commands and queries). In other words, these ports will allow *port-adapted delivery mechanisms* to initiate actions (i.e. *drive* some application service).

  * __Secondary Ports:__ These are ports which the application exposes in order to utilise *external systems* (that are a part of the overall infrastructure) via a utility-specific interface, in order to *internally* execute on a use-case-specific action, e.g. to send an event message to another service.

  * The Application Core comprises three layers:

    * __Outer Layer:__ This is basically an optional set of handlers/routers for commands, queries, and events which *may* encapsulate components of the Application Layer, exposing ports to the Wider Application.
  
    * __Application Layer:__ This layer comprises of use-case-specific services each of which expose their own interfaces (for components of the Outer Layer) or expose ports directly to the Wider Application. These services totally encapsulate the Domain Layer.

    * __Domain Layer:__ The Domain Layer concerns itself only with domain entities and how to manipulate them, it *never* concerns itself with a use-case. If there is a need to mutate several domain entities, then *Domain Services* are implemented in this layer to do such jobs. Domain Services expose an interface for Application Layer services.
  
    * __Note:__ If there is ever a need for an application service to access data from any other domain, it may access that data strictly as read-only (via this framework, the shared kernel). Changes to data from another domain may only be carried out by application services encapsulating that domain (e.g. via event messages).

* The __Wider Application__ connects the Application core to the overall system infrastructure using Adapters.

* The general assumption of a service is that it:

    1. Obtain one or more domain entities from a data repository.
    2. Execute some logic on those entities, possible changing them.
    3. Persisting changes by pushing them up to the repository.
