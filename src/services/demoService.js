export const demoActions = {
    SCROLL_TO: 'SCROLL_TO',
    SELECT_USER: 'SELECT_USER',
    TOGGLE_FILTERS: 'TOGGLE_FILTERS',
    HIGHLIGHT_ELEMENT: 'HIGHLIGHT_ELEMENT',
    SHOW_VISUALIZATION: 'SHOW_VISUALIZATION',
    APPLY_FILTER: 'APPLY_FILTER',
    WAIT: 'WAIT',
    CLICK_ELEMENT: 'CLICK_ELEMENT',
    SCROLL_CONTAINER: 'SCROLL_CONTAINER',
    TOGGLE_MENU: 'TOGGLE_MENU',
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL'
};

const demoSteps = {
    'start demo': [
        { 
            type: demoActions.WAIT, 
            duration: 1500,
            message: "Welcome! Let me show you around OpenBooks. 👋" 
        },
        {
            type: demoActions.HIGHLIGHT_ELEMENT,
            target: '.hamburger-menu',
            message: "First, let's explore the navigation menu."
        },
        {
            type: demoActions.WAIT,
            duration: 1000
        },
        {
            type: demoActions.TOGGLE_MENU,
            value: true,
            message: "Opening the menu to see available options."
        },
        {
            type: demoActions.WAIT,
            duration: 1500
        },
        {
            type: demoActions.HIGHLIGHT_ELEMENT,
            target: '[data-action="load-config"]',
            message: "Here you can load previously saved configurations."
        },
        {
            type: demoActions.WAIT,
            duration: 1500
        },
        {
            type: demoActions.OPEN_MODAL,
            modalType: 'configs',
            message: "Let's look at some saved configurations."
        },
        {
            type: demoActions.WAIT,
            duration: 1500
        },
        {
            type: demoActions.SCROLL_CONTAINER,
            target: '.configs-modal-content',
            duration: 4000,
            message: "Each configuration saves your filter settings, making it easy to switch between different views of your data."
        },
        {
            type: demoActions.WAIT,
            duration: 2000
        },
        {
            type: demoActions.CLOSE_MODAL,
            modalType: 'configs',
            message: "Now, let's explore the filtering system."
        },
        { 
            type: demoActions.SCROLL_TO, 
            target: '.filters',
            message: "Here's our powerful filtering system." 
        },
        { 
            type: demoActions.WAIT, 
            duration: 2000 
        },
        { 
            type: demoActions.TOGGLE_FILTERS, 
            value: true,
            message: "You can filter users by multiple criteria simultaneously." 
        },
        { 
            type: demoActions.WAIT, 
            duration: 2000 
        },
        { 
            type: demoActions.HIGHLIGHT_ELEMENT, 
            target: '.age-filter',
            message: "Try adjusting the age range using these interactive sliders." 
        },
        { 
            type: demoActions.WAIT, 
            duration: 3000 
        },
        { 
            type: demoActions.APPLY_FILTER,
            filter: {
                type: 'age',
                value: [25, 35]
            },
            message: "Let's filter for users between 25 and 35 years old."
        },
        { 
            type: demoActions.WAIT, 
            duration: 2000 
        },
        { 
            type: demoActions.HIGHLIGHT_ELEMENT,
            target: '.occupation-filter',
            message: "You can also filter by occupation. Let's look at Engineers and Designers."
        },
        {
            type: demoActions.WAIT,
            duration: 2000
        },
        {
            type: demoActions.APPLY_FILTER,
            filter: {
                type: 'occupation',
                value: ['Engineer', 'Designer']
            },
            message: "Notice how the table updates in real-time."
        },
        { 
            type: demoActions.WAIT, 
            duration: 2000 
        },
        { 
            type: demoActions.SCROLL_TO, 
            target: '.data-visualization',
            message: "Here's a visual representation of your filtered data." 
        },
        { 
            type: demoActions.SHOW_VISUALIZATION,
            chart: 'age',
            message: "This chart shows the age distribution of your selected users."
        },
        { 
            type: demoActions.WAIT, 
            duration: 3000 
        },
        { 
            type: demoActions.SCROLL_TO, 
            target: '.spreadsheet-table',
            message: "Now, let's look at individual user details." 
        },
        { 
            type: demoActions.SELECT_USER, 
            index: 2,
            message: "Click on any user to see their detailed information and notes." 
        },
        {
            type: demoActions.WAIT,
            duration: 3000,
            message: "That concludes our quick tour! Feel free to explore more features or ask me any questions. 😊"
        }
    ]
};

const executeAction = async (action, callbacks) => {
    const { 
        onScroll, 
        onSelectUser, 
        onToggleFilters, 
        onHighlight, 
        onMessage, 
        onApplyFilter, 
        onShowVisualization, 
        onClickElement,
        onToggleMenu,
        onOpenModal,
        onCloseModal
    } = callbacks;

    switch (action.type) {
        case demoActions.TOGGLE_MENU: {
            onToggleMenu?.(action.value);
            break;
        }

        case demoActions.OPEN_MODAL: {
            onOpenModal?.(action.modalType);
            break;
        }

        case demoActions.CLOSE_MODAL: {
            onCloseModal?.(action.modalType);
            break;
        }

        case demoActions.SCROLL_CONTAINER: {
            const container = document.querySelector(action.target);
            if (container) {
                const startTime = Date.now();
                const duration = action.duration;
                const startScroll = container.scrollTop;
                const endScroll = container.scrollHeight - container.clientHeight;

                const scroll = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Use easeInOutCubic for smoother scrolling
                    const easeProgress = progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    container.scrollTop = startScroll + (endScroll - startScroll) * easeProgress;
                    
                    if (progress < 1) {
                        requestAnimationFrame(scroll);
                    }
                };

                requestAnimationFrame(scroll);
                await new Promise(resolve => setTimeout(resolve, duration));
            }
            break;
        }

        case demoActions.SCROLL_TO: {
            const element = document.querySelector(action.target);
            if (element) {
                onScroll?.(element);
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            break;
        }

        case demoActions.SELECT_USER: {
            onSelectUser?.(action.index);
            break;
        }

        case demoActions.TOGGLE_FILTERS: {
            onToggleFilters?.(action.value);
            break;
        }

        case demoActions.HIGHLIGHT_ELEMENT: {
            const element = document.querySelector(action.target);
            if (element) {
                onHighlight?.(element);
            }
            break;
        }

        case demoActions.APPLY_FILTER: {
            onApplyFilter?.(action.filter);
            break;
        }

        case demoActions.SHOW_VISUALIZATION: {
            onShowVisualization?.(action.chart);
            break;
        }

        case demoActions.CLICK_ELEMENT: {
            const element = document.querySelector(action.target);
            if (element) {
                onClickElement?.(element);
            }
            break;
        }

        case demoActions.WAIT: {
            await new Promise(resolve => setTimeout(resolve, action.duration));
            break;
        }

        default:
            break;
    }

    if (action.message) {
        onMessage?.(action.message);
    }
};

export const startDemo = async (demoName, callbacks) => {
    const steps = demoSteps[demoName.toLowerCase()];
    if (!steps) return false;

    for (const step of steps) {
        await executeAction(step, callbacks);
        // Add a small delay between steps for smoother transitions
        await new Promise(resolve => setTimeout(resolve, 750));
    }

    return true;
}; 