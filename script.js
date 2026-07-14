// =============================================
// STUDENT ENROLLMENT FORM - JAVASCRIPT
// =============================================

// ===== CONFIGURATION =====
var jpdbBaseURL = "https://api.jsonpowerdb.com:5567";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var dbName = "SCHOOL-DB";
var relationName = "STUDENT-TABLE";
var connToken = "764065920|7385821562357875224|764063936";

// =============================================
// INITIALIZATION
// =============================================
$(document).ready(function() {
    console.log("Document ready - Form initialized");
    resetForm();
    
    // TRIGGER 1: Press Enter key on Roll No field
    $("#rollNo").on('keydown', function(e) {
        if (e.which === 13) { // Enter key
            e.preventDefault();
            console.log("Enter key pressed on Roll No");
            getStudent();
        }
    });
    
    // TRIGGER 2: When focus leaves Roll No field (Tab or click outside)
    $("#rollNo").on('blur', function() {
        console.log("Blur event on Roll No");
        getStudent();
    });
    
    // TRIGGER 3: On input change (when user types)
    $("#rollNo").on('input', function() {
        console.log("Input event on Roll No");
        // Optional: auto-trigger after typing stops
    });
    
    // Keyboard shortcut: Press Enter to Save/Update
    $("#studentForm input, #studentForm textarea").on('keypress', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            if (!$("#saveBtn").prop("disabled")) {
                saveData();
            } else if (!$("#updateBtn").prop("disabled")) {
                changeData();
            }
        }
    });
});


function saveRecNo2LS(jsonObj) {
    try {
        var lvData = JSON.parse(jsonObj.data);
        localStorage.setItem("recno", lvData.rec_no);
        console.log("rec_no saved:", lvData.rec_no);
    } catch (e) {
        console.error("Error saving rec_no:", e);
    }
}

// =============================================
// GET STUDENT ID AS JSON OBJECT
// =============================================
function getStudentIdAsJsonObj() {
    var rollNo = $("#rollNo").val().trim();
    var jsonStr = {
        "Roll-No": rollNo
    };
    return JSON.stringify(jsonStr);
}

// =============================================
// GET STUDENT (Called on Roll No change)
// =============================================
function getStudent() {
    var rollNo = $("#rollNo").val().trim();
    console.log("getStudent() called with rollNo:", rollNo);
    
    if (rollNo === "") {
        console.log("Roll No is empty, resetting form");
        resetForm();
        return;
    }

    var rollNoJsonObj = getStudentIdAsJsonObj();
  var getRequest = createGETRequest(
    connToken,
    dbName,
    relationName,
    rollNoJsonObj
);
    
    console.log("GET Request:", getRequest);
    
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(
        getRequest,
        jpdbBaseURL,
        jpdbIRL
    );
    jQuery.ajaxSetup({ async: true });
    
    console.log("GET Response:", resJsonObj);
    
    if (resJsonObj.status === 400) {
        // NEW STUDENT - Enable Save
        console.log("NEW STUDENT - Enabling fields");
        enableFields(false);
        clearFields();
        $("#rollNo").prop("disabled", false);
        $("#saveBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#updateBtn").prop("disabled", true);
        $("#fullName").focus();
        hideMessage();
        localStorage.removeItem("recno");
        showMessage("New student - Please fill all fields", "info");
    } else if (resJsonObj.status === 200) {
        // EXISTING STUDENT - Fill Data
        console.log("EXISTING STUDENT - Filling data");
        var record = JSON.parse(resJsonObj.data).record;
        fillData(record);
        saveRecNo2LS(resJsonObj);
        enableFields(false);
        $("#rollNo").prop("disabled", true);
        $("#updateBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#saveBtn").prop("disabled", true);
        $("#fullName").focus();
        hideMessage();
        showMessage("Existing student - Data loaded", "info");
    } else {
        // API Error
        console.log("API Error - Enabling fields for testing");
        enableFields(false);
        clearFields();
        $("#rollNo").prop("disabled", false);
        $("#saveBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);
        $("#updateBtn").prop("disabled", true);
        $("#fullName").focus();
        showMessage("API Error: " + JSON.stringify(resJsonObj), "danger");
    }
}

// =============================================
// ENABLE/DISABLE FIELDS
// =============================================
function enableFields(disabled) {
    $("#fullName").prop("disabled", disabled);
    $("#class").prop("disabled", disabled);
    $("#birthDate").prop("disabled", disabled);
    $("#address").prop("disabled", disabled);
    $("#enrollmentDate").prop("disabled", disabled);
    console.log("Fields enabled set to:", !disabled);
}

// =============================================
// FILL DATA IN FORM
// =============================================
function fillData(record) {
    $("#fullName").val(record["Full-Name"] || "");
    $("#class").val(record["Class"] || "");
    $("#birthDate").val(record["Birth-Date"] || "");
    $("#address").val(record["Address"] || "");
    $("#enrollmentDate").val(record["Enrollment-Date"] || "");
    console.log("Data filled:", record);
}

// =============================================
// CLEAR ALL FIELDS
// =============================================
function clearFields() {
    $("#fullName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    console.log("Fields cleared");
}

// =============================================
// VALIDATE FORM DATA
// =============================================
function validateData() {
    var rollNo, fullName, classVal, birthDate, address, enrollmentDate;
    
    rollNo = $("#rollNo").val().trim();
    fullName = $("#fullName").val().trim();
    classVal = $("#class").val().trim();
    birthDate = $("#birthDate").val().trim();
    address = $("#address").val().trim();
    enrollmentDate = $("#enrollmentDate").val().trim();

    if (rollNo === "") {
        alert("Roll Number is required");
        $("#rollNo").focus();
        return "";
    }

    if (fullName === "") {
        alert("Full Name is required");
        $("#fullName").focus();
        return "";
    }

    if (classVal === "") {
        alert("Class is required");
        $("#class").focus();
        return "";
    }

    if (birthDate === "") {
        alert("Birth Date is required");
        $("#birthDate").focus();
        return "";
    }

    if (address === "") {
        alert("Address is required");
        $("#address").focus();
        return "";
    }

    if (enrollmentDate === "") {
        alert("Enrollment Date is required");
        $("#enrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
        "Roll-No": rollNo,
        "Full-Name": fullName,
        "Class": classVal,
        "Birth-Date": birthDate,
        "Address": address,
        "Enrollment-Date": enrollmentDate
    };

    return JSON.stringify(jsonStrObj);
}

// =============================================
// SAVE STUDENT (Insert New Record)
// =============================================
function saveData() {
    console.log("saveData() called");
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return;
    }
    
    var putRequest = createPUTRequest(
        connToken,
        jsonStrObj,
        dbName,
        relationName
    );
    
    console.log("SAVE Request:", putRequest);
    
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(
        putRequest,
        jpdbBaseURL,
        jpdbIML
    );
    jQuery.ajaxSetup({ async: true });
    
    console.log("SAVE Response:", resJsonObj);
    
    if (resJsonObj.status === 200) {
        showMessage("Student enrolled successfully! ✅", "success");
        resetForm();
    } else {
        showMessage("Error saving: " + (resJsonObj.message || "Unknown error"), "danger");
    }
}

// =============================================
// UPDATE STUDENT (Update Existing Record)
// =============================================
function changeData() {
    console.log("changeData() called");
    $("#updateBtn").prop("disabled", true);
    var jsonChg = validateData();
    if (jsonChg === "") {
        $("#updateBtn").prop("disabled", false);
        return;
    }
    
    var recNo = localStorage.getItem("recno");
    if (!recNo) {
        alert("Record number not found. Please fetch the record first.");
        $("#updateBtn").prop("disabled", false);
        return;
    }
    
    var updateRequest = createUPDATERecordRequest(
        connToken,
        jsonChg,
        dbName,
        relationName,
        recNo
    );
    
    console.log("UPDATE Request:", updateRequest);
    
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(
        updateRequest,
        jpdbBaseURL,
        jpdbIML
    );
    jQuery.ajaxSetup({ async: true });
    
    console.log("UPDATE Response:", resJsonObj);
    
    if (resJsonObj.status === 200) {
        showMessage("Student record updated successfully! ✅", "success");
        resetForm();
    } else {
        showMessage("Error updating: " + (resJsonObj.message || "Unknown error"), "danger");
        $("#updateBtn").prop("disabled", false);
    }
}

// =============================================
// RESET FORM
// =============================================
function resetForm() {
    console.log("resetForm() called");
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#class").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
    $("#rollNo").prop("disabled", false);
    enableFields(true); // Disable all other fields
    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);
    $("#rollNo").focus();
    hideMessage();
    localStorage.removeItem("recno");
    console.log("Form reset complete");
}

// =============================================
// SHOW/HIDE MESSAGES
// =============================================
function showMessage(message, type) {
    var alertClass = "alert alert-" + type;
    $("#responseMsg").html('<div class="' + alertClass + '">' + message + '</div>');
}

function hideMessage() {
    $("#responseMsg").html("");
}