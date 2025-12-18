// visitor-counter.js
// Visitor counter functionality for SafetyGuide360

class VisitorCounter {
    constructor() {
        this.counterKey = 'safetyguide360_visitor_counter';
        this.sessionKey = 'safetyguide360_session';
        this.counterElementId = 'visitorCounter';
        this.init();
    }

    init() {
        // Check if this is a new session
        if (!sessionStorage.getItem(this.sessionKey)) {
            this.incrementCounter();
            sessionStorage.setItem(this.sessionKey, 'active');
        }
        
        // Display the counter
        this.displayCounter();
        
        // Optional: Track with Google Analytics
        this.trackWithGA();
    }

    incrementCounter() {
        let count = localStorage.getItem(this.counterKey);
        
        if (!count) {
            count = Math.floor(Math.random() * 5000) + 1000; // Start with random base count
        } else {
            count = parseInt(count);
        }
        
        count++;
        localStorage.setItem(this.counterKey, count);
        
        return count;
    }

    getCounter() {
        let count = localStorage.getItem(this.counterKey);
        
        if (!count) {
            count = Math.floor(Math.random() * 5000) + 1000;
            localStorage.setItem(this.counterKey, count);
        }
        
        return parseInt(count);
    }

    displayCounter() {
        let count = this.getCounter();
        
        // Format number with commas
        const formattedCount = count.toLocaleString();
        
        // Create or update counter element
        let counterElement = document.getElementById(this.counterElementId);
        
        if (!counterElement) {
            // Create counter element if it doesn't exist
            counterElement = document.createElement('div');
            counterElement.id = this.counterElementId;
            counterElement.className = 'visitor-counter';
            
            // Add to header or footer as needed
            const header = document.querySelector('header .container');
            if (header) {
                const counterContainer = document.createElement('div');
                counterContainer.className = 'bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 text-sm px-4 py-2 rounded-full shadow-sm flex items-center';
                counterContainer.innerHTML = `
                    <i class="fas fa-users mr-2"></i>
                    <span class="font-bold" id="counterValue">${formattedCount}</span>
                    <span class="ml-1">Visitors</span>
                `;
                header.appendChild(counterContainer);
            }
        } else {
            // Update existing counter
            const valueElement = counterElement.querySelector('#counterValue');
            if (valueElement) {
                valueElement.textContent = formattedCount;
            }
        }
        
        // Add animation effect
        this.animateCounter();
    }

    animateCounter() {
        const counterElement = document.querySelector('#counterValue');
        if (counterElement) {
            counterElement.classList.add('animate-pulse');
            setTimeout(() => {
                counterElement.classList.remove('animate-pulse');
            }, 1000);
        }
    }

    trackWithGA() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_visit', {
                'event_category': 'engagement',
                'event_label': 'Visitor Counter',
                'value': this.getCounter()
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.visitorCounter = new VisitorCounter();
});

// Function to manually update counter (if needed)
function updateVisitorCounter() {
    if (window.visitorCounter) {
        window.visitorCounter.incrementCounter();
        window.visitorCounter.displayCounter();
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VisitorCounter;
}
