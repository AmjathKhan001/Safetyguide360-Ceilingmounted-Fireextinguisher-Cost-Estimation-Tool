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
        
        // Update counter element
        const counterElement = document.getElementById(this.counterElementId);
        if (counterElement) {
            counterElement.textContent = formattedCount;
        }
        
        // Add animation effect
        this.animateCounter();
    }

    animateCounter() {
        const counterElement = document.getElementById(this.counterElementId);
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
