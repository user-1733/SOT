document.addEventListener('DOMContentLoaded', function() {
    const loginTypeDropdown = document.getElementById('loginType');
    const loginContainer = document.querySelector('.login-container'); // Target the main login container
    const studentLoginSection = document.getElementById('studentLoginSection');
    const adminLoginSection = document.getElementById('adminLoginSection');
    const teacherLoginSection = document.getElementById('teacherLoginSection');
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.display = 'none';
    }

    // Initially hide all login sections except the selected one
    const initialLoginType = loginTypeDropdown.value;
    showLoginSection(initialLoginType);

    function showLoginSection(type) {
        if (loginContainer) {
            // All login forms are now within the loginContainer
            const allLoginSections = loginContainer.querySelectorAll('[id$="LoginSection"]');
            allLoginSections.forEach(section => {
                section.style.display = 'none';
            });

            if (type === 'student') {
                studentLoginSection.style.display = 'block';
            } else if (type === 'admin') {
                adminLoginSection.style.display = 'block';
            } else if (type === 'teacher') {
                teacherLoginSection.style.display = 'block';
            }
        }
    }

    if (loginTypeDropdown) {
        loginTypeDropdown.addEventListener('change', function() {
            const selectedType = this.value;
            showLoginSection(selectedType);
        });
    }

    const studentLoginForm = document.getElementById('studentLoginForm');
    const studentLoginErrorDiv = document.getElementById('studentLoginError');

    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const studentIdInput = this.querySelector('#studentId');
            const gradeSelect = this.querySelector('#gradeSelect');
            const branchSelect = this.querySelector('#branchSelect');

            if (!studentIdInput.value.trim()) {
                displayStudentError('Please enter your Student ID.');
                return;
            }
            if (!gradeSelect.value) {
                displayStudentError('Please select your Grade.');
                return;
            }
            if (!branchSelect.value) {
                displayStudentError('Please select your Branch.');
                return;
            }

            if (studentIdInput.value.trim() === '00410' && gradeSelect.value === 'grade10' && branchSelect.value === 'BE') {
                console.log('Successful login for Student ID: 00410, Grade: 10, Branch: BE');
                displayStudentSuccess('Student login successful!');
                hideLoginArea(); // Updated to hide the entire login container
                showMainContent();
            } else {
                displayStudentError('Invalid Student ID, Grade, or Branch.');
                console.log('Failed login attempt with Student ID:', studentIdInput.value, 'Grade:', gradeSelect.value, 'Branch:', branchSelect.value);
            }
        });
    }
    function displayStudentError(message) {
        if (studentLoginErrorDiv) {
            studentLoginErrorDiv.textContent = message;
            studentLoginErrorDiv.classList.add('error-message');
        } else {
            alert('Student Login Error: ' + message);
        }
    }
    function displayStudentSuccess(message) {
        if (studentLoginErrorDiv) {
            studentLoginErrorDiv.textContent = message;
            studentLoginErrorDiv.classList.remove('error-message');
            studentLoginErrorDiv.classList.add('success-message');
            setTimeout(() => {
                studentLoginErrorDiv.textContent = '';
                studentLoginErrorDiv.classList.remove('success-message');
            }, 3000);
        } else {
            alert('Student Login Success: ' + message);
        }
    }

    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminLoginErrorDiv = document.getElementById('adminLoginError');

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const adminAccessCodeInput = this.querySelector('#adminAccessCode');
            if (!adminAccessCodeInput.value.trim()) {
                displayAdminError('Please enter the Access Code.');
                return;
            }
            console.log('Attempting Admin login with Access Code:', adminAccessCodeInput.value);
            displayAdminSuccess('Admin login successful!');
            hideLoginArea(); // Updated to hide the entire login container
            showMainContent();
        });
    }
    function displayAdminError(message) {
        if (adminLoginErrorDiv) {
            adminLoginErrorDiv.textContent = message;
            adminLoginErrorDiv.classList.add('error-message');
        } else {
            alert('Admin Login Error: ' + message);
        }
    }
    function displayAdminSuccess(message) {
        if (adminLoginErrorDiv) {
            adminLoginErrorDiv.textContent = message;
            adminLoginErrorDiv.classList.remove('error-message');
            adminLoginErrorDiv.classList.add('success-message');
            setTimeout(() => {
                adminLoginErrorDiv.textContent = '';
                adminLoginErrorDiv.classList.remove('success-message');
            }, 3000);
        } else {
            alert('Admin Login Success: ' + message);
        }
    }

    const teacherLoginForm = document.getElementById('teacherLoginForm');
    const teacherLoginErrorDiv = document.getElementById('teacherLoginError');

    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const teacherTitleSelect = this.querySelector('#teacherTitle');
            const teacherNameInput = this.querySelector('#teacherName');
            const teacherBranchSelect = this.querySelector('#teacherBranchSelect');
            if (!teacherTitleSelect.value) {
                displayTeacherError('Please select your Title.');
                return;
            }
            if (!teacherNameInput.value.trim()) {
                displayTeacherError('Please enter your Name.');
                return;
            }
            if (!teacherBranchSelect.value) {
                displayTeacherError('Please select your Branch.');
                return;
            }
            const teacherIdentifier = `${teacherTitleSelect.value} ${teacherNameInput.value.trim()}`;
            console.log('Attempting Teacher login as:', teacherIdentifier, 'from Branch:', teacherBranchSelect.value);
            displayTeacherSuccess('Teacher login successful!');
            hideLoginArea(); // Updated to hide the entire login container
            showMainContent();
        });
    }
    function displayTeacherError(message) {
        if (teacherLoginErrorDiv) {
            teacherLoginErrorDiv.textContent = message;
            teacherLoginErrorDiv.classList.add('error-message');
        } else {
            alert('Teacher Login Error: ' + message);
        }
    }
    function displayTeacherSuccess(message) {
        if (teacherLoginErrorDiv) {
            teacherLoginErrorDiv.textContent = message;
            teacherLoginErrorDiv.classList.remove('error-message');
            teacherLoginErrorDiv.classList.add('success-message');
            setTimeout(() => {
                teacherLoginErrorDiv.textContent = '';
                teacherLoginErrorDiv.classList.remove('success-message');
            }, 3000);
        } else {
            alert('Teacher Login Success: ' + message);
        }
    }

    function hideLoginArea() {
        const loginSelection = document.querySelector('.login-selection-container');
        if (loginSelection) {
            loginSelection.style.display = 'none';
        }
        if (loginContainer) {
            loginContainer.style.display = 'none';
        }
    }

    function showMainContent() {
        if (mainContent) {
            mainContent.style.display = 'block';
        }
    }

    window.checkAnswer = function(questionName) {
        const form = document.querySelector(`form.choices [name="${questionName}"]`).closest('form.choices');
        const selectedAnswer = form.querySelector(`input[name="${questionName}"]:checked`);
        const feedbackDivId = `feedback-${questionName}`;
        const feedbackDiv = document.getElementById(feedbackDivId);
        const correctOption = form.querySelector(`input[name="${questionName}"][data-correct="true"]`);

        if (selectedAnswer) {
            if (selectedAnswer.dataset.correct === 'true') {
                feedbackDiv.textContent = 'Correct!';
                feedbackDiv.className = 'feedback correct';
            } else {
                feedbackDiv.textContent = 'Incorrect. Please try again.';
                feedbackDiv.className = 'feedback incorrect';
                if (correctOption) {
                    feedbackDiv.textContent += ` The correct answer is: ${getLabelForRadio(correctOption)}.`;
                }
            }
        } else {
            feedbackDiv.textContent = 'Please select an answer.';
            feedbackDiv.className = 'feedback warning';
        }
    };

    function getLabelForRadio(radioElement) {
        const label = document.querySelector(`label[for="${radioElement.id}"]`) || document.querySelector(`label:has(input[id="${radioElement.id}"])`);
        return label ? label.textContent : '';
    }

    // --- Show Forum Questions on "View Course" Click ---
    const viewCourseButtons = document.querySelectorAll('.view-course-button');
    viewCourseButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            // Find the parent course-card of the clicked button
            const courseCard = this.closest('.course-card');
            if (courseCard) {
                // Find the forum-questions div within that course card
                const forumQuestionsDiv = courseCard.querySelector('.forum-questions');
                if (forumQuestionsDiv) {
                    forumQuestionsDiv.style.display = 'block'; // Show the forum questions
                }
            }
        });
    });
});