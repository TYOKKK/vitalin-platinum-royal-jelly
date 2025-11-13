/* Enhanced Auto Mode Indicator */
.auto-mode-indicator {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(212, 175, 55, 0.95);
    color: var(--white);
    padding: 10px 15px;
    border-radius: 25px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: pulse 2s infinite;
    z-index: 3;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.auto-mode-indicator .bg-name {
    font-weight: 600;
    margin-right: 5px;
}

.auto-mode-indicator .bg-status {
    opacity: 0.8;
    font-size: 0.7rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 6px;
    border-radius: 10px;
}

/* Smooth transition untuk background */
.hero-section {
    transition: background-image 1.5s ease-in-out;
}

/* Loading animation */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

/* Responsive indicator */
@media (max-width: 768px) {
    .auto-mode-indicator {
        top: 10px;
        left: 10px;
        padding: 8px 12px;
        font-size: 0.7rem;
    }
    
    .auto-mode-indicator .bg-status {
        display: none;
    }
}