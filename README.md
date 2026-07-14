# Student Enrollment Form

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Scope of Functionalities](#scope-of-functionalities)
- [Examples of Use](#examples-of-use)
- [Illustrations](#illustrations)
- [Project Status](#project-status)
- [Release History](#release-history)
- [Sources](#sources)

---

## Description

The **Student Enrollment Form** is a web-based application developed as part of the Login2Xplore Micro Project.

It stores student information in the **STUDENT-TABLE** relation of the **SCHOOL-DB** database using **JsonPowerDB (JPDB)**.

The application validates the primary key (Roll No.) before performing database operations.

- If the Roll No. does not exist, the user can enter student details and save the record.
- If the Roll No. already exists, the corresponding record is displayed and can be updated.
- The Reset button clears the form and prepares it for a new operation.

---

## Features

- Student Enrollment Form
- Primary Key (Roll No.) validation
- Save new student records
- Update existing student records
- Reset form
- Client-side validation
- Responsive user interface
- JsonPowerDB database integration using AJAX

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap
- AJAX
- JsonPowerDB (JPDB)

---

## Benefits of using JsonPowerDB

- Simple and easy-to-use REST API
- High performance and lightweight
- Schema-free JSON database
- Fast CRUD operations
- Minimal development effort
- Reduces backend coding
- Easy integration with JavaScript applications
- Suitable for small and medium-sized web applications

---

## Scope of Functionalities

The project provides the following functionalities:

- Enter student details
- Validate Roll Number
- Save student records
- Retrieve existing records
- Update existing records
- Reset the form
- Prevent empty field submission

---

## Examples of Use

### Save Record
1. Enter a new Roll Number.
2. Fill all student details.
3. Click **Save**.
4. Record is stored in JsonPowerDB.

### Update Record
1. Enter an existing Roll Number.
2. Student details are automatically loaded.
3. Modify required fields.
4. Click **Update**.
5. Updated information is saved.

### Reset Form
Click **Reset** to clear the form and return it to its initial state.

---

## Illustrations

Add screenshots of your project here after uploading them to GitHub.

Example:

```
screenshots/
│── form.png
│── save.png
│── update.png
```

Then include them like this:

```md
![Home](screenshots/form.png)

![Save Record](screenshots/save.png)

![Update Record](screenshots/update.png)
```

---

## Project Status

✅ Completed

This project was developed as part of the Login2Xplore JsonPowerDB Micro Project.

---

## Release History

### Version 1.0.0

- Initial release
- Student Enrollment Form
- Save functionality
- Update functionality
- Reset functionality
- JsonPowerDB integration
- Primary key validation

---

## Sources

- Login2Xplore
- JsonPowerDB Documentation
- Bootstrap Documentation
- HTML Documentation (MDN)
- CSS Documentation (MDN)
- JavaScript Documentation (MDN)

---

## Author

**Hitesh**

GitHub: https://github.com/Hiteshdot08