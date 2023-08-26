# Style Guide

## Logging

Borrowed from [Eric Kahuha's blog post](https://www.section.io/engineering-education/how-to-choose-levels-of-logging).

* All log messages to be written to operating system's `stdout` file using the default `console.*(...)` API.
* Log messages should be lowercase.
* Argument and variable names in log messages must be encapsulated by `'`.
* String literals in log messages must be encapsulated by `"`.
* Log messages using the correct level:

  * `debug(...)`: Used to log granular details of the application.

  * `info(...)`: Used to log normal and expected behaviors of the application.

  * `warn(...)`: Used when an unexpected behavior has been recognized which may (or may not) cause harm. This messages indicate that the issue needs to be investigated and prevented, but the application may still continue to be operational.

  * `error(...)`: Used to log fatal and non-fatal errors.
    * Fatal errors are errors where the application's situation is catastrophic, making it practically nonfunctional. Ideally the application should abort after this log message so that a re-run may be attempted by the system.
    * Non-fatal errors are errors where something important in the application is failing and needs to be addressed as soon as possible, however the application may continue to run with partial functionality.
