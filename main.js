// ==UserScript==
// @name         Venyx-Style UI in Vanilla JavaScript with Minimize Feature
// @namespace    http://violentmonkey.net/
// @version      1.3
// @description  A draggable Venyx-like interface with page navigation, sections, slider value, and top title using plain JavaScript
// @author       You
// @match        https://discord.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create the main container
    const container = document.createElement('div');
    container.style.width = '450px';
    container.style.height = '350px';
    container.style.backgroundColor = 'rgb(76, 76, 120)';
    container.style.position = 'fixed';
    container.style.top = '50px';
    container.style.left = '50px';
    container.style.borderRadius = '10px';
    container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    container.style.zIndex = '1000';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.color = 'white';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.fontSize = '12px';
    container.style.cursor = 'move'; // Change cursor to move when hovering

    // Draggable functionality
    let isDragging = false;
    let startX, startY, initialMouseX, initialMouseY;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialMouseX = e.clientX;
        initialMouseY = e.clientY;
        startX = container.offsetLeft;
        startY = container.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - initialMouseX;
            const dy = e.clientY - initialMouseY;
            container.style.left = `${startX + dx}px`;
            container.style.top = `${startY + dy}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Title Bar
    const titleBar = document.createElement('div');
    titleBar.innerText = 'Protorn';
    titleBar.style.width = '100%';
    titleBar.style.padding = '10px';
    titleBar.style.backgroundColor = '#7289da';
    titleBar.style.color = 'white';
    titleBar.style.fontSize = '16px';
    titleBar.style.textAlign = 'center';
    titleBar.style.fontWeight = 'bold';
    titleBar.style.borderTopLeftRadius = '10px';
    titleBar.style.borderTopRightRadius = '10px';
    titleBar.style.position = 'relative';
    titleBar.style.boxSizing = 'border-box'; // Include padding in width

    // Minimize Button
    const minimizeButton = document.createElement('button');
    minimizeButton.innerText = '−';
    minimizeButton.style.position = 'absolute';
    minimizeButton.style.top = '5px';
    minimizeButton.style.right = '5px';
    minimizeButton.style.backgroundColor = '#ff4757';
    minimizeButton.style.color = 'white';
    minimizeButton.style.border = 'none';
    minimizeButton.style.borderRadius = '50%';
    minimizeButton.style.width = '25px';
    minimizeButton.style.height = '25px';
    minimizeButton.style.cursor = 'pointer';
    minimizeButton.style.fontSize = '14px';
    minimizeButton.style.lineHeight = '25px';
    minimizeButton.style.textAlign = 'center';

    minimizeButton.addEventListener('click', function() {
        if (container.style.display !== 'none') {
            container.style.display = 'none';
            minimizeCircle.style.display = 'flex'; // Show the circle button when minimized
        }
    });
    titleBar.appendChild(minimizeButton);
    container.appendChild(titleBar);

    // Main Content (Sidebar and Content Area)
    const mainContent = document.createElement('div');
    mainContent.style.display = 'flex';
    mainContent.style.flexGrow = '1';
    mainContent.style.overflow = 'hidden';

    // Sidebar
    const sidebar = document.createElement('div');
    sidebar.style.width = '120px';
    sidebar.style.backgroundColor = '#23272a';
    sidebar.style.borderBottomLeftRadius = '10px';
    sidebar.style.display = 'flex';
    sidebar.style.flexDirection = 'column';
    sidebar.style.padding = '10px';

    // Sidebar items (pages)
    const pages = ['Home', 'Settings', 'Tools'];
    let currentPage = 'Home'; // Default page
    const pageButtons = {};

    pages.forEach(page => {
        const pageButton = document.createElement('button');
        pageButton.innerText = page;
        pageButton.style.backgroundColor = currentPage === page ? '#7289da' : 'transparent';
        pageButton.style.color = 'white';
        pageButton.style.border = 'none';
        pageButton.style.borderRadius = '5px';
        pageButton.style.padding = '8px';
        pageButton.style.textAlign = 'left';
        pageButton.style.cursor = 'pointer';
        pageButton.style.marginBottom = '8px';
        pageButton.style.width = '100%'; // Ensure buttons fill the sidebar width

        // Add hover effect
        pageButton.addEventListener('mouseenter', function() {
            if (currentPage !== page) {
                pageButton.style.backgroundColor = '#2c2f33'; // Darker on hover
            }
        });
        pageButton.addEventListener('mouseleave', function() {
            if (currentPage !== page) {
                pageButton.style.backgroundColor = 'transparent'; // Reset on leave
            }
        });

        pageButton.addEventListener('click', function() {
            currentPage = page;
            updatePageContent();
            // Highlight the selected page
            for (let key in pageButtons) {
                pageButtons[key].style.backgroundColor = key === currentPage ? '#7289da' : 'transparent';
            }
        });

        sidebar.appendChild(pageButton);
        pageButtons[page] = pageButton;
    });

    // Content Area
    const contentArea = document.createElement('div');
    contentArea.style.flexGrow = '1';
    contentArea.style.padding = '15px';
    contentArea.style.backgroundColor = '#2c2f33';
    contentArea.style.borderBottomRightRadius = '10px';
    contentArea.style.overflowY = 'auto';

    // Append the sidebar and content area to the main content wrapper
    mainContent.appendChild(sidebar);
    mainContent.appendChild(contentArea);
    container.appendChild(mainContent);
    document.body.appendChild(container);

    // Function to update the page content based on currentPage
    function updatePageContent() {
        contentArea.innerHTML = ''; // Clear the current content
        if (currentPage === 'Home') {
            contentArea.innerHTML = '<h2 style="margin-top: 0; margin-bottom: 15px;">Home Page</h2>';
            contentArea.appendChild(createSection('Quick Actions', [
                { label: 'Start', type: 'button' },
                { label: 'Pause', type: 'button' },
                { label: 'Status', type: 'toggle' }
            ]));
        } else if (currentPage === 'Settings') {
            contentArea.innerHTML = '<h2 style="margin-top: 0; margin-bottom: 15px;">Settings</h2>';
            contentArea.appendChild(createSection('Preferences', [
                { label: 'Sound', type: 'toggle' },
                { label: 'Brightness', type: 'slider' },
                { label: 'Username', type: 'text' }
            ]));
        } else if (currentPage === 'Tools') {
            contentArea.innerHTML = '<h2 style="margin-top: 0; margin-bottom: 15px;">Tools</h2>';
            contentArea.appendChild(createSection('Toolbox', [
                { label: 'Tool A', type: 'button' },
                { label: 'Tool B', type: 'button' },
                { label: 'Tool C', type: 'toggle' }
            ]));
        }
    }

    // Helper function to create sections with interactable elements
    function createSection(title, items) {
        const section = document.createElement('div');
        section.style.marginBottom = '15px';

        const sectionTitle = document.createElement('h3');
        sectionTitle.innerText = title;
        sectionTitle.style.borderBottom = '1px solid #ddd';
        sectionTitle.style.paddingBottom = '5px';
        sectionTitle.style.marginBottom = '10px';
        sectionTitle.style.fontSize = '14px';
        section.appendChild(sectionTitle);

        items.forEach(item => {
            const itemRow = document.createElement('div');
            itemRow.style.display = 'flex';
            itemRow.style.justifyContent = 'space-between';
            itemRow.style.alignItems = 'center';
            itemRow.style.marginBottom = '10px';

            const label = document.createElement('label');
            label.innerText = item.label;
            let input;

            if (item.type === 'button') {
                input = document.createElement('button');
                input.innerText = item.label;
                input.style.padding = '5px 10px';
                input.style.backgroundColor = '#7289da';
                input.style.color = 'white';
                input.style.border = 'none';
                input.style.borderRadius = '5px';
                input.style.cursor = 'pointer';

                // Add hover effect
                input.addEventListener('mouseenter', function() {
                    input.style.backgroundColor = '#5a6e97'; // Darker on hover
                });
                input.addEventListener('mouseleave', function() {
                    input.style.backgroundColor = '#7289da'; // Reset on leave
                });

                input.addEventListener('click', function() {
                    alert(`${item.label} clicked!`);
                });
            } else if (item.type === 'toggle') {
                input = document.createElement('div');
                input.style.display = 'inline-block';
                input.style.cursor = 'pointer';
                input.style.padding = '5px 10px';
                input.style.backgroundColor = '#f44336'; // OFF color
                input.style.borderRadius = '5px';
                input.style.textAlign = 'center';

                input.innerText = 'OFF';
                input.style.transition = 'background-color 0.2s'; // Smooth transition
                input.style.userSelect = 'none'; // Prevent text selection

                // Add hover effect
                input.addEventListener('mouseenter', function() {
                    input.style.backgroundColor = '#d32f2f'; // Darker on hover
                });
                input.addEventListener('mouseleave', function() {
                    input.style.backgroundColor = '#f44336'; // Reset on leave
                });

                input.addEventListener('click', function() {
                    if (input.innerText === "OFF") {
                        input.innerText = "ON";
                        input.style.backgroundColor = '#4CAF50'; // ON color
                    } else {
                        input.innerText = "OFF";
                        input.style.backgroundColor = '#f44336'; // OFF color
                    }
                });
            } else if (item.type === 'text') {
                input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Enter value';
                input.style.width = '120px';
                input.style.padding = '5px';
                input.style.borderRadius = '5px';
                input.style.border = '1px solid #ccc';
            } else if (item.type === 'slider') {
                const sliderContainer = document.createElement('div');
                sliderContainer.style.display = 'flex';
                sliderContainer.style.alignItems = 'center';

                input = document.createElement('input');
                input.type = 'range';
                input.min = '0';
                input.max = '100';
                input.value = '50';
                input.style.marginRight = '10px';

                const sliderValue = document.createElement('span');
                sliderValue.innerText = input.value;
                sliderValue.style.minWidth = '30px'; // Ensure space for the value display

                input.addEventListener('input', function() {
                    sliderValue.innerText = input.value; // Update the displayed value
                });

                sliderContainer.appendChild(input);
                sliderContainer.appendChild(sliderValue);
                itemRow.appendChild(label);
                itemRow.appendChild(sliderContainer);
                section.appendChild(itemRow);
                return section;
            }

            itemRow.appendChild(label);
            itemRow.appendChild(input);
            section.appendChild(itemRow);
        });

        return section;
    }

    // Initialize the content area with the default page
    updatePageContent();

    // Minimize circle button
    const minimizeCircle = document.createElement('button');
    minimizeCircle.innerText = '⚪'; // Circle icon
    minimizeCircle.style.position = 'fixed';
    minimizeCircle.style.bottom = '20px';
    minimizeCircle.style.left = '20px';
    minimizeCircle.style.backgroundColor = '#7289da';
    minimizeCircle.style.color = 'white';
    minimizeCircle.style.border = 'none';
    minimizeCircle.style.borderRadius = '50%';
    minimizeCircle.style.width = '40px';
    minimizeCircle.style.height = '40px';
    minimizeCircle.style.fontSize = '20px';
    minimizeCircle.style.cursor = 'pointer';
    minimizeCircle.style.display = 'none'; // Hidden initially

    minimizeCircle.addEventListener('click', function() {
        container.style.display = 'flex'; // Show the container
        minimizeCircle.style.display = 'none'; // Hide the circle
    });

    document.body.appendChild(minimizeCircle);
})();
