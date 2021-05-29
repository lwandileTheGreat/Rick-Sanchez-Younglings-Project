/**
 * Template Name: Plato - v2.1.0
 * Template URL: https://bootstrapmade.com/plato-responsive-bootstrap-website-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
!(function($) {
    "use strict";

    // Smooth scroll for the navigation menu and links with .scrollto classes
    var scrolltoOffset = $("#header").outerHeight() - 1;
    $(document).on(
        "click",
        ".nav-menu a, .mobile-nav a, .scrollto",
        function(e) {
            if (
                location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                e.preventDefault();
                var target = $(this.hash);
                if (target.length) {
                    var scrollto = target.offset().top - scrolltoOffset;

                    if ($(this).attr("href") == "#header") {
                        scrollto = 0;
                    }

                    $("html, body").animate({
                            scrollTop: scrollto,
                        },
                        1500,
                        "easeInOutExpo"
                    );

                    if ($(this).parents(".nav-menu, .mobile-nav").length) {
                        $(".nav-menu .active, .mobile-nav .active").removeClass("active");
                        $(this).closest("li").addClass("active");
                    }

                    if ($("body").hasClass("mobile-nav-active")) {
                        $("body").removeClass("mobile-nav-active");
                        $(".mobile-nav-toggle i").toggleClass(
                            "icofont-navigation-menu icofont-close"
                        );
                        $(".mobile-nav-overly").fadeOut();
                    }
                    return false;
                }
            }
        }
    );

    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function() {
        if (window.location.hash) {
            var initial_nav = window.location.hash;
            if ($(initial_nav).length) {
                var scrollto = $(initial_nav).offset().top - scrolltoOffset;
                $("html, body").animate({
                        scrollTop: scrollto,
                    },
                    1500,
                    "easeInOutExpo"
                );
            }
        }
    });

    // Mobile Navigation
    if ($(".nav-menu").length) {
        var $mobile_nav = $(".nav-menu").clone().prop({
            class: "mobile-nav d-lg-none",
        });
        $("body").append($mobile_nav);
        $("body").prepend(
            '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
        );
        $("body").append('<div class="mobile-nav-overly"></div>');

        $(document).on("click", ".mobile-nav-toggle", function(e) {
            $("body").toggleClass("mobile-nav-active");
            $(".mobile-nav-toggle i").toggleClass(
                "icofont-navigation-menu icofont-close"
            );
            $(".mobile-nav-overly").toggle();
        });

        $(document).on("click", ".mobile-nav .drop-down > a", function(e) {
            e.preventDefault();
            $(this).next().slideToggle(300);
            $(this).parent().toggleClass("active");
        });

        $(document).click(function(e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($("body").hasClass("mobile-nav-active")) {
                    $("body").removeClass("mobile-nav-active");
                    $(".mobile-nav-toggle i").toggleClass(
                        "icofont-navigation-menu icofont-close"
                    );
                    $(".mobile-nav-overly").fadeOut();
                }
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // Navigation active state on scroll
    var nav_sections = $("section");
    var main_nav = $(".nav-menu, .mobile-nav");

    $(window).on("scroll", function() {
        var cur_pos = $(this).scrollTop() + 200;

        nav_sections.each(function() {
            var top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                if (cur_pos <= bottom) {
                    main_nav.find("li").removeClass("active");
                }
                main_nav
                    .find('a[href="#' + $(this).attr("id") + '"]')
                    .parent("li")
                    .addClass("active");
            }
            if (cur_pos < 300) {
                $(".nav-menu ul:first li:first").addClass("active");
            }
        });
    });

    // Stick the header at top on scroll
    $("#header").sticky({
        topSpacing: 0,
        zIndex: "50",
    });

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });

    $(".back-to-top").click(function() {
        $("html, body").animate({
                scrollTop: 0,
            },
            1500,
            "easeInOutExpo"
        );
        return false;
    });

    // Porfolio isotope and filter
    $(window).on("load", function() {
        var portfolioIsotope = $(".portfolio-container").isotope({
            itemSelector: ".portfolio-item",
            layoutMode: "fitRows",
        });

        $("#portfolio-flters li").on("click", function() {
            $("#portfolio-flters li").removeClass("filter-active");
            $(this).addClass("filter-active");

            portfolioIsotope.isotope({
                filter: $(this).data("filter"),
            });
            aos_init();
        });

        // Initiate venobox (lightbox feature used in portofilo)
        $(document).ready(function() {
            $(".venobox").venobox();
        });
    });

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1,
    });

    // Portfolio details carousel
    $(".portfolio-details-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1,
    });

    // Init AOS
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    }
    $(window).on("load", function() {
        aos_init();
    });
})(jQuery);

// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

// Main
// On document load, hide all screens and show the main menu
$(document).ready(function() {
    $(".screen").each(function() {
        $(this).hide();
        $(".options").show();
    });
});

// Change which screen the user sees
function changeScreen(prev, next) {
    $(prev).hide();
    $(next).show();
}

// Starts a new game
function newGame() {
    timer = 60;
    var i = 0;
    if (i == 0) {
        $("#mazeCount").html(1);
    }

    for (var i = 1; i <= 2; i++) {
        var mazeNumber = parseInt(i);
        generateMaze(mazeNumber);
    }

    $(".singleMaze").hide();
    $("#maze1").show();
}

// Generates a new maze for infinite levels
function generateNewMaze() {
    var current = $(".singleMaze");
    var currentCount = current.length;
    var current = current[currentCount - 1];

    var currentClass = current.id;
    var nextMazeNumber = parseInt(currentClass.replace("maze", ""));
    generateMaze(nextMazeNumber + 1);
}

// Maze

var timer;
let clockImg;
let goldImg;
let playerImg;
let endImg;

function generateMaze(mazeNumber) {
    const game = (maze) => {
        // Variables for generating the maze
        var cols, rows, current;
        var cellSize = 25;
        var grid = [];
        var stack = [];
        var gold = [];

        // Time variables
        var time;
        var timeCellEffectiveness = 20; // Seconds to add
        var timeCellThreshold = 0.45; // Percentage out of 1

        // Scoring Variables
        var completedMazeScore = 500;
        var goldenNuggetScore = 200;
        var missedGoldPenalty = goldenNuggetScore / 2;

        // Variables for controls
        var startedPlaying = false;
        var playPosition = false;
        var endPosition = false;
        if (mazeNumber == 1) {
            var activeMaze = true;
        }

        // Performance
        p5.disableFriendlyErrors = true;

        // Setting the difficulty of the maze from what the user has selected.
        var difficulty = $('input[name="difficulty"]:checked').val();
        if (difficulty == "easy") {
            var size = 300;
            var goldCount = 2;
        } else if (difficulty == "medium") {
            var size = 450;
            var goldCount = 4;
        } else if (difficulty == "hard") {
            var size = 650;
            var goldCount = 7;
        }

        // Runs only once
        maze.setup = function() {
            // Create a new canvas elemtn and add it to the DOM
            let canvas = maze.createCanvas(size, size);
            canvas.id("maze" + mazeNumber);
            canvas.class("singleMaze");
            canvas.parent("maze");
            maze.setFrameRate(60);

            // Calculate how many rows and columns for the grid
            rows = maze.floor(maze.height / cellSize);
            cols = maze.floor(maze.width / cellSize);

            // Create the grid object
            for (var y = 0; y < rows; y++) {
                for (var x = 0; x < cols; x++) {
                    var cell = new Cell(x, y);
                    grid.push(cell);
                }
            }

            // Display initial timer
            $(".timer").html(timer + "s");

            current = grid[0];

            // Create some cells be gold cells
            for (var i = 0; i < goldCount; i++) {
                gold[i] = grid[Math.floor(Math.random() * grid.length)];
                gold[i].gold = "waiting";
            }

            // Have a change of creating a time cell
            var timeCell = Math.random() * 1;

            if (timeCell <= timeCellThreshold) {
                while (!time) {
                    var rand = Math.floor(Math.random() * (grid.length * 0.15));
                    time = grid[rand];
                    time.time == "waiting";

                    if (time.gold == "waiting") {
                        time = 0;
                    }
                }
            }

            while (!playPosition) {
                var rand = Math.floor(Math.random() * (grid.length * 0.15));
                playPosition = grid[rand];

                if (playPosition.gold == "waiting" || playPosition.time == "waiting") {
                    playPosition = 0;
                }
            }
            while (!endPosition) {
                var rand = Math.floor(
                    Math.random() * (grid.length - grid.length * 0.75) +
                    grid.length * 0.75
                );
                endPosition = grid[rand];

                if (endPosition.gold == "waiting" || endPosition.time == "waiting") {
                    endPosition = 0;
                }
            }
        };

        // The game loop, is always running unless the instance is removed
        maze.draw = function() {
            maze.background(000000);

            // Checks to see if it is the active maze
            getActiveMaze = $("#mazeCount").html();
            if (getActiveMaze == mazeNumber) {
                activeMaze = true;
            } else {
                activeMaze = false;
            }

            // Update the visuals of the canvas every frame
            for (var i = 0; i < grid.length; i++) {
                grid[i].show();
            }

            // Sets the current cell as visited for the maze generation
            current.visited = true;
            if (!startedPlaying) {
                // Highlight where the Pointer cell currently is only when generating the maze
                current.highlight();
            }
            // Checks the neighbours of the current cell, returns with either undefined or a neighbouring cell object
            var next = current.checkNeighbours();

            if (next) {
                // If there's a cell object, then move to it
                stack.push(current);
                removeWalls(current, next);
                current = next;
            } else if (stack.length > 0) {
                // If it is undefined, and if the stack has objects still in it then backtrack through until there's a neighbouring cell or the stack is empty
                current = stack.pop();
            } else if (activeMaze && !startedPlaying) {
                // If the maze generation is completed and the maze is the activeMaze then controls are allowed. Only runs once otherwise inifnite event listeners are added
                startedPlaying = true;

                // Show gold once the maze is generated
                for (var i = 0; i < gold.length; i++) {
                    gold[i].gold = true;
                }
                if (time) {
                    time.time = true;
                }

                startPlaying(mazeNumber);
                // Show the start and end points
                playPosition.playPosition = true;
                endPosition.endPosition = true;
            }

            // Update time to user
            if (activeMaze && startedPlaying) {
                if (maze.frameCount % 60 == 0 && timer > 0) {
                    timer--;
                    $(".timer").html(timer + "s");
                }

                if (timer == 0) {
                    var SCORE = $(".score").html();
                    var scoreValue = parseInt(SCORE.replace("GOLD: ", ""));

                    $(".successScore").html("Your gold: " + scoreValue);
                    maze.remove();
                    changeScreen(".maze", ".timeOut");
                    if (scoreValue > 3600) {
                        alert("You Are A Genius Like Rick!!!");
                    }
                }
            }
        };

        // Used to validate and fetch the index of the called cell in grid[].
        var index = function(x, y) {
            if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
                return -1;
            }
            return x + y * cols;
        };

        // Remove the walls of each cell when generating the maze
        var removeWalls = function(a, b) {
            var topBottom = a.y - b.y;
            var leftRight = a.x - b.x;

            if (leftRight == 1) {
                // If 1, then moving left
                a.walls[3] = false;
                b.walls[1] = false;
            } else if (leftRight == -1) {
                // If -1, then moving right
                a.walls[1] = false;
                b.walls[3] = false;
            }

            if (topBottom == 1) {
                // If 1, then moving up
                a.walls[0] = false;
                b.walls[2] = false;
            } else if (topBottom == -1) {
                // If -1, then moving down
                a.walls[2] = false;
                b.walls[0] = false;
            }
        };

        // The Cell object, used to hold all data to do with the each cell.
        Cell = function(x, y) {
            this.x = x;
            this.y = y;
            this.visited = false;
            this.highlight = false;
            this.walls = [true, true, true, true];

            this.playPosition = false;
            this.endPosition = false;
            this.gold = false;
            this.time = false;

            // Called when generating the maze to check for neighbours
            this.checkNeighbours = function() {
                var x = this.x;
                var y = this.y;
                var neighbours = [];

                var top = grid[index(x, y - 1)];
                var right = grid[index(x + 1, y)];
                var bottom = grid[index(x, y + 1)];
                var left = grid[index(x - 1, y)];

                // Checks each neighbours to see if they are valid to be a neighbour
                [top, right, bottom, left].forEach((n) => {
                    if (n && !n.visited) {
                        neighbours.push(n);
                    }
                });

                // If there's a neighbour then select a random one, if not then return undefined which will trigger either backtracking or the game to start
                if (neighbours.length > 0) {
                    var r = Math.floor(Math.random() * neighbours.length);
                    return neighbours[r];
                } else {
                    return undefined;
                }
            };

            // Called every frame to update the canvas visuals
            this.show = function() {
                var x = this.x * cellSize;
                var y = this.y * cellSize;

                maze.stroke(255);
                maze.strokeWeight(2);
                maze.noFill();

                // If the wall is wanted, it will be drawn to the canvas
                if (this.walls[0] == true) {
                    maze.line(x, y, x + cellSize, y);
                }
                if (this.walls[1] == true) {
                    maze.line(x + cellSize, y, x + cellSize, y + cellSize);
                }
                if (this.walls[2] == true) {
                    maze.line(x + cellSize, y + cellSize, x, y + cellSize);
                }
                if (this.walls[3] == true) {
                    maze.line(x, y + cellSize, x, y);
                }

                // Display if the maze has been visited
                if (this.visited) {
                    maze.noStroke();
                    maze.fill(0);
                    maze.rect(x, y, cellSize, cellSize);
                }
                // Display the current play position
                if (this.playPosition) {
                    maze.fill(255, 0, 0);
                    maze.triangle(
                        x + cellSize / 2,
                        y + 5,
                        x + 5,
                        y + cellSize - 5,
                        x + cellSize - 5,
                        y + cellSize - 5
                    );
                }
                // Display the current end position
                if (this.endPosition) {
                    maze.fill(000000);
                    maze.fill(0, 255, 0);
                    maze.circle(x + 10, y + 10, cellSize - 10, cellSize - 10);
                }
                // Display gold
                if (this.gold === true) {
                    maze.noStroke();
                    maze.fill(255, 215, 0);
                    maze.circle(x + 10, y + 10, cellSize - 10, cellSize - 10);
                }

                // Display time
                if (this.time === true) {
                    maze.noStroke();
                    maze.fill(0, 0, 255);
                    maze.circle(x + 10, y + 10, cellSize - 10, cellSize - 10);

                    //                    maze.image(clockImg, x, y, cellSize, cellSize);
                }
            };

            // Called when generating the maze to show where the current pointer is
            this.highlight = function() {
                var x = this.x * cellSize;
                var y = this.y * cellSize;

                maze.noStroke();
                maze.fill(0, 0, 255);
                maze.rect(x, y, cellSize, cellSize);
            };
        };

        // Called when the maze is active to add controls
        var startPlaying = function() {
            window.addEventListener("keydown", movement); // Add the event listener for keydown

            function movement(e) {
                var moveTo;
                var valid = false;
                // Checks the active keys code and checks if it is a valid input, if not then nothing will happen.
                switch (e.code) {
                    case "ArrowUp":
                    case "KeyW":
                        // Fetches the relevant neighbouring cell, using the index function
                        moveTo = grid[index(playPosition.x, playPosition.y - 1)];
                        // Checks to see if the relevant walls for both the current and new positions are false
                        if (moveTo && !playPosition.walls[0] && !moveTo.walls[2]) {
                            valid = true;
                        }
                        break;
                    case "ArrowRight":
                    case "KeyD":
                        moveTo = grid[index(playPosition.x + 1, playPosition.y)];

                        if (moveTo && !playPosition.walls[1] && !moveTo.walls[3]) {
                            valid = true;
                        }
                        break;
                    case "ArrowDown":
                    case "KeyS":
                        moveTo = grid[index(playPosition.x, playPosition.y + 1)];

                        if (moveTo && !playPosition.walls[2] && !moveTo.walls[0]) {
                            valid = true;
                        }
                        break;
                    case "ArrowLeft":
                    case "KeyA":
                        moveTo = grid[index(playPosition.x - 1, playPosition.y)];

                        if (moveTo && !playPosition.walls[3] && !moveTo.walls[1]) {
                            valid = true;
                        }
                        break;
                }

                if (valid) {
                    // Move current play position to the new cell
                    playPosition.playPosition = false;
                    playPosition = moveTo;
                    playPosition.playPosition = true;

                    // Check if the new position is a gold cell
                    if (playPosition.gold) {
                        playPosition.gold = false;
                        addToScore(goldenNuggetScore);
                    }

                    // Check if the new play position is a time cell
                    if (playPosition.time == true) {
                        playPosition.time = false;
                        timer += timeCellEffectiveness;
                    }

                    // Check if the new play position is the endPosition
                    if (playPosition.endPosition) {
                        // Remove the event listener for movement, if not then the next maze will move two squares etc...
                        window.removeEventListener("keydown", movement);
                        // Generate a new maze
                        generateNewMaze();
                        // Remove variables
                        activeMaze = false;
                        playable = false;
                        // Changes the hidden field to pass to the other maze instances which are checking for their number
                        $("#mazeCount").html(mazeNumber + 1);
                        // Remove the maze as it is no longer needed
                        maze.remove();

                        // Add the score for completing a maze
                        var missedGold = 0;
                        for (var i = 0; i < grid.length; i++) {
                            if (grid[i].gold == true) {
                                missedGold += 1;
                            }
                        }

                        if (missedGold == 0) {
                            goldToAdd = completedMazeScore;
                        } else {
                            goldToAdd = completedMazeScore - missedGold * missedGoldPenalty;
                        }

                        addToScore(goldToAdd);
                        var nextMaze = mazeNumber + 1;
                        $(".singleMaze").hide();
                        $("#maze" + nextMaze).show();

                        return;
                    }
                }
            }
        };
    };

    // Creates a new instance of p5
    let startMaze = new p5(game);
}

// Used to add to the total score
function addToScore(toAdd) {
    var SCORE = $(".score").html();
    var scoreValue = parseInt(SCORE.replace("GOLD: ", ""));
    scoreValue += toAdd;

    $(".score").html("GOLD: " + scoreValue);
}