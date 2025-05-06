document.addEventListener('DOMContentLoaded', function() {
    // DOM elements for exercises
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const exerciseCounter = document.getElementById('exercise-counter');
    const exerciseTitle = document.getElementById('exercise-title');
    const exerciseDescription = document.getElementById('exercise-description');
    const exerciseAnimation = document.getElementById('exercise-animation');
    const timerBtn = document.getElementById('timer-btn');
    const timerDisplay = document.getElementById('timer-display');
    const resetTrackerBtn = document.getElementById('reset-tracker');
    const dayCheckboxes = document.querySelectorAll('.day-checkbox');

    // DOM elements for auth
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeButtons = document.querySelectorAll('.close');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');

    // State
    let exercises = [];
    let currentExerciseIndex = 0;
    let timerInterval = null;
    let secondsRemaining = 60;

    // Fetch exercises from API or fallback to local data
    async function loadExercises() {
        try {
            exercises = await window.api.getExercises();
            console.log('Exercises loaded from API:', exercises);
        } catch (error) {
            console.error('Failed to load exercises from API, using local data:', error);
            exercises = [
                {
                    _id: '1',
                    title: "Deep Breathing",
                    description: "Breathe in slowly through your nose for 4 counts, hold for 2, then exhale through your mouth for 6 counts. Repeat for 1 minute.",
                    animation: "breathing-circle",
                    duration: 60
                },
                {
                    _id: '2',
                    title: "Body Scan",
                    description: "Close your eyes and slowly scan your attention from the top of your head down to your toes, noticing any sensations without judgment.",
                    animation: "scan-animation",
                    duration: 120
                },
                {
                    _id: '3',
                    title: "5-4-3-2-1 Grounding",
                    description: "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
                    animation: "grounding-animation",
                    duration: 90
                },
                {
                    _id: '4',
                    title: "Mindful Walking",
                    description: "Walk slowly and deliberately, paying attention to each step. Notice the sensation of your feet touching the ground and your body moving through space.",
                    animation: "walking-animation",
                    duration: 180
                },
                {
                    _id: '5',
                    title: "Gratitude Practice",
                    description: "Take a moment to write down or mentally note three things you're grateful for today, no matter how small they might seem.",
                    animation: "gratitude-animation",
                    duration: 60
                }
            ];
        }
        updateExerciseDisplay();
    }

    // Initialize
    loadExercises();
    checkAuthStatus();
    loadCheckboxState();

    // Event listeners for exercises
    prevBtn.addEventListener('click', showPreviousExercise);
    nextBtn.addEventListener('click', showNextExercise);
    timerBtn.addEventListener('click', toggleTimer);
    resetTrackerBtn.addEventListener('click', resetTracker);

    // Add event listeners to checkboxes
    dayCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveCheckboxState);
    });

    // Event listeners for auth
    loginBtn.addEventListener('click', () => loginModal.style.display = 'block');
    registerBtn.addEventListener('click', () => registerModal.style.display = 'block');
    logoutBtn.addEventListener('click', handleLogout);

    // Close modals when clicking X or outside the modal
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === registerModal) registerModal.style.display = 'none';
    });

    // Form submissions
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    // When ESC key is pressed, close modals
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    });
    
    // Clear form errors when inputs change
    document.getElementById('login-email').addEventListener('input', () => {
        loginError.textContent = '';
    });
    
    document.getElementById('login-password').addEventListener('input', () => {
        loginError.textContent = '';
    });
    
    document.getElementById('register-name').addEventListener('input', () => {
        registerError.textContent = '';
    });
    
    document.getElementById('register-email').addEventListener('input', () => {
        registerError.textContent = '';
    });
    
    document.getElementById('register-password').addEventListener('input', () => {
        registerError.textContent = '';
    });
    
    document.getElementById('register-confirm').addEventListener('input', () => {
        registerError.textContent = '';
    });

    // Functions for exercises
    function updateExerciseDisplay() {
        const exercise = exercises[currentExerciseIndex];
        if (!exercise) return;
        
        exerciseTitle.textContent = exercise.title;
        exerciseDescription.textContent = exercise.description;
        exerciseCounter.textContent = `${currentExerciseIndex + 1}/${exercises.length}`;
        
        // Update animation
        exerciseAnimation.innerHTML = '';
        const animationElement = document.createElement('div');
        animationElement.className = exercise.animation;
        exerciseAnimation.appendChild(animationElement);
        
        // Update navigation buttons
        prevBtn.disabled = currentExerciseIndex === 0;
        nextBtn.disabled = currentExerciseIndex === exercises.length - 1;
        
        // Reset timer
        resetTimer();
        
        // Update timer button text to reflect exercise duration
        const duration = exercise.duration || 60;
        const mins = Math.floor(duration / 60);
        const secs = duration % 60;
        timerBtn.textContent = `Start ${mins}:${secs.toString().padStart(2, '0')} Timer`;
        secondsRemaining = duration;
    }

    function showPreviousExercise() {
        if (currentExerciseIndex > 0) {
            currentExerciseIndex--;
            updateExerciseDisplay();
        }
    }

    function showNextExercise() {
        if (currentExerciseIndex < exercises.length - 1) {
            currentExerciseIndex++;
            updateExerciseDisplay();
        }
    }

    function toggleTimer() {
        if (timerInterval) {
            // Stop timer
            clearInterval(timerInterval);
            timerInterval = null;
            
            const exercise = exercises[currentExerciseIndex];
            const duration = exercise.duration || 60;
            const mins = Math.floor(duration / 60);
            const secs = duration % 60;
            timerBtn.textContent = `Start ${mins}:${secs.toString().padStart(2, '0')} Timer`;
            
            timerDisplay.style.display = 'none';
            secondsRemaining = duration;
        } else {
            // Start timer
            const exercise = exercises[currentExerciseIndex];
            secondsRemaining = exercise.duration || 60;
            timerDisplay.textContent = formatTime(secondsRemaining);
            timerDisplay.style.display = 'block';
            timerBtn.textContent = 'Stop Timer';
            
            timerInterval = setInterval(() => {
                secondsRemaining--;
                timerDisplay.textContent = formatTime(secondsRemaining);
                
                if (secondsRemaining <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    
                    const exercise = exercises[currentExerciseIndex];
                    const duration = exercise.duration || 60;
                    const mins = Math.floor(duration / 60);
                    const secs = duration % 60;
                    timerBtn.textContent = `Start ${mins}:${secs.toString().padStart(2, '0')} Timer`;
                    
                    // Record completed exercise if user is logged in
                    if (window.api.isAuthenticated()) {
                        try {
                            window.api.recordExercise(exercise._id, exercise.duration || 60)
                                .then(() => {
                                    // Alert when timer is done
                                    setTimeout(() => {
                                        alert('Time is up! Great job completing this exercise. Your progress has been recorded.');
                                    }, 500);
                                })
                                .catch(error => {
                                    console.error('Error recording exercise:', error);
                                    // Alert when timer is done
                                    setTimeout(() => {
                                        alert('Time is up! Great job completing this exercise.');
                                    }, 500);
                                });
                        } catch (error) {
                            console.error('Error recording exercise:', error);
                            // Alert when timer is done
                            setTimeout(() => {
                                alert('Time is up! Great job completing this exercise.');
                            }, 500);
                        }
                    } else {
                        // Alert when timer is done
                        setTimeout(() => {
                            alert('Time is up! Great job completing this exercise. Log in to track your progress!');
                        }, 500);
                    }
                }
            }, 1000);
        }
    }

    function resetTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        const exercise = exercises[currentExerciseIndex];
        if (!exercise) return;
        
        const duration = exercise.duration || 60;
        const mins = Math.floor(duration / 60);
        const secs = duration % 60;
        timerBtn.textContent = `Start ${mins}:${secs.toString().padStart(2, '0')} Timer`;
        
        timerDisplay.style.display = 'none';
        secondsRemaining = duration;
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    function saveCheckboxState() {
        const checkboxStates = {};
        dayCheckboxes.forEach((checkbox, index) => {
            checkboxStates[`day${index + 1}`] = checkbox.checked;
        });
        localStorage.setItem('exerciseTracking', JSON.stringify(checkboxStates));
    }

    function loadCheckboxState() {
        const savedState = localStorage.getItem('exerciseTracking');
        if (savedState) {
            const checkboxStates = JSON.parse(savedState);
            dayCheckboxes.forEach((checkbox, index) => {
                checkbox.checked = checkboxStates[`day${index + 1}`] || false;
            });
        }
    }

    function resetTracker() {
        dayCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        saveCheckboxState();
    }

    // Auth functions
    function checkAuthStatus() {
        if (window.api.isAuthenticated()) {
            const user = window.api.getCurrentUser();
            if (user) {
                userName.textContent = `Welcome, ${user.name}`;
                loginBtn.style.display = 'none';
                registerBtn.style.display = 'none';
                userInfo.style.display = 'flex';
                
                // Also update the day tracker with personalized message
                const trackerText = document.querySelector('.tracking-section h2');
                if (trackerText) {
                    trackerText.textContent = `${user.name}'s Progress`;
                }
            }
        } else {
            loginBtn.style.display = 'inline-block';
            registerBtn.style.display = 'inline-block';
            userInfo.style.display = 'none';
            
            // Reset the tracker text
            const trackerText = document.querySelector('.tracking-section h2');
            if (trackerText) {
                trackerText.textContent = 'Track Your Progress';
            }
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        loginError.textContent = '';
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (!email || !password) {
            loginError.textContent = 'Please enter both email and password';
            return;
        }
        
        try {
            await window.api.loginUser(email, password);
            loginModal.style.display = 'none';
            loginForm.reset();
            checkAuthStatus();
            alert('Login successful!');
        } catch (error) {
            console.error('Login error:', error);
            loginError.textContent = error.message || 'Login failed. Please try again.';
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        registerError.textContent = '';
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        // Simple validation
        if (!name || !email || !password || !confirmPassword) {
            registerError.textContent = 'Please fill in all fields';
            return;
        }
        
        if (password !== confirmPassword) {
            registerError.textContent = 'Passwords do not match';
            return;
        }
        
        if (password.length < 6) {
            registerError.textContent = 'Password must be at least 6 characters';
            return;
        }
        
        try {
            await window.api.registerUser(name, email, password);
            registerModal.style.display = 'none';
            registerForm.reset();
            checkAuthStatus();
            alert('Registration successful! You are now logged in.');
        } catch (error) {
            console.error('Registration error:', error);
            registerError.textContent = error.message || 'Registration failed. Please try again.';
        }
    }

    function handleLogout() {
        window.api.logoutUser();
        checkAuthStatus();
    }

    // Add animations for different exercises
    const styleSheet = document.styleSheet || document.createElement('style');
    styleSheet.textContent = `
        .breathing-circle {
            width: 100px;
            height: 100px;
            background-color: var(--primary-light);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: breathe 8s infinite ease-in-out;
        }

        .scan-animation {
            width: 80px;
            height: 150px;
            background: linear-gradient(to bottom, transparent, var(--primary-light), transparent);
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            animation: bodyScan 4s infinite ease-in-out;
        }

        .grounding-animation {
            width: 100px;
            height: 100px;
            background-color: var(--primary-light);
            border-radius: 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(0deg);
            animation: rotate 5s infinite linear;
        }

        .walking-animation {
            width: 15px;
            height: 15px;
            background-color: var(--primary-color);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            animation: walk 4s infinite linear;
        }

        .gratitude-animation {
            width: 40px;
            height: 40px;
            background-color: var(--primary-light);
            position: absolute;
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: pulse 2s infinite ease-in-out;
        }

        @keyframes breathe {
            0%, 100% {
                transform: translate(-50%, -50%) scale(1);
                background-color: var(--primary-light);
            }
            50% {
                transform: translate(-50%, -50%) scale(1.5);
                background-color: var(--secondary-color);
            }
        }

        @keyframes bodyScan {
            0%, 100% {
                top: 0;
                height: 30px;
            }
            50% {
                top: 120px;
                height: 30px;
            }
        }

        @keyframes rotate {
            0% {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }

        @keyframes walk {
            0% {
                left: 0;
            }
            100% {
                left: calc(100% - 15px);
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: translate(-50%, -50%) scale(1);
            }
            50% {
                transform: translate(-50%, -50%) scale(1.3);
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Book functions
    const booksContainer = document.getElementById('books-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentCategory = 'all';
    
    // Function to update book cover images to use local files
    function updateBookCoverImages(books) {
        return books.map(book => {
            // Create a modified book object with local image path
            const modifiedBook = { ...book };
            
            // Map book ID to local image filename
            switch(book._id) {
                case '1':
                    modifiedBook.coverImage = "images/books/mindful-way-depression.svg";
                    break;
                case '2':
                    modifiedBook.coverImage = "images/books/feeling-good.svg";
                    break;
                case '3':
                    modifiedBook.coverImage = "images/books/body-keeps-score.svg";
                    break;
                case '4':
                    modifiedBook.coverImage = "images/books/full-catastrophe-living.svg";
                    break;
                case '5':
                    modifiedBook.coverImage = "images/books/anxiety-worry-workbook.svg";
                    break;
                case '6':
                    modifiedBook.coverImage = "images/books/zebras-dont-get-ulcers.svg";
                    break;
                case '7':
                    modifiedBook.coverImage = "images/books/self-care-solution.svg";
                    break;
                case '8':
                    modifiedBook.coverImage = "images/books/wherever-you-go.svg";
                    break;
                default:
                    // Keep the external URL as fallback
                    break;
            }
            
            return modifiedBook;
        });
    }

    // Load books into the books section
    const loadBooks = async () => {
        try {
            // Show loading spinner
            document.querySelector('.loading-spinner').style.display = 'block';
            
            // Get books from API
            let books = await window.api.getBooks();
            
            // Use local images instead of external URLs
            books = updateBookCoverImages(books);
            
            // Clear any existing books
            const booksContainer = document.getElementById('books-container');
            // Remove loading spinner
            booksContainer.innerHTML = '';
            
            // Create book cards and add to container
            books.forEach(book => {
                const bookCard = createBookCard(book);
                booksContainer.appendChild(bookCard);
            });
            
        } catch (error) {
            console.error('Error loading books:', error);
            document.getElementById('books-container').innerHTML = `
                <div class="error-message">
                    <p>Failed to load books. Please try again later.</p>
                </div>
            `;
        }
    };
    
    // Create a book card element
    const createBookCard = (book) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.setAttribute('data-category', book.category);
        
        // Create star rating based on book rating
        const stars = "★".repeat(Math.floor(book.rating)) + "☆".repeat(5 - Math.floor(book.rating));
        
        bookCard.innerHTML = `
            <div class="book-cover">
                <img src="${book.coverImage}" alt="${book.title} Cover">
                <span class="book-category">${book.category}</span>
            </div>
            <div class="book-content">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-description">${book.description}</p>
                <div class="book-rating">
                    <span class="stars">${stars}</span>
                    <span>${book.rating.toFixed(1)}/5</span>
                </div>
                <a href="${book.amazonLink}" class="book-link" target="_blank">View on Amazon</a>
            </div>
        `;
        
        return bookCard;
    };
    
    // Handle category filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category to filter by
            const category = button.getAttribute('data-category');
            
            // Show/hide books based on category
            const bookCards = document.querySelectorAll('.book-card');
            bookCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Load books when page loads
    loadBooks();
});