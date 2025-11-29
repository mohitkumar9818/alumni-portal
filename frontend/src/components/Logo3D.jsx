import './Logo3D.css'

const Logo3D = ({ size = 'medium', animated = true }) => {
    return (
        <div className={`logo-3d-container ${size} ${animated ? 'animated' : ''}`}>
            <div className="logo-3d-wrapper">
                {/* Graduation Cap 3D Structure */}
                <div className="graduation-cap-3d">
                    {/* Cap Top (Board) */}
                    <div className="cap-board">
                        <div className="board-face top"></div>
                        <div className="board-face bottom"></div>
                        <div className="board-face front"></div>
                        <div className="board-face back"></div>
                        <div className="board-face left"></div>
                        <div className="board-face right"></div>
                    </div>

                    {/* Cap Base */}
                    <div className="cap-base">
                        <div className="base-face top"></div>
                        <div className="base-face bottom"></div>
                        <div className="base-side"></div>
                    </div>

                    {/* Tassel */}
                    <div className="tassel">
                        <div className="tassel-string"></div>
                        <div className="tassel-end"></div>
                    </div>

                    {/* Letter 'A' for Alumni */}
                    <div className="logo-letter">A</div>
                </div>

                {/* Glow Effect */}
                <div className="logo-glow"></div>

                {/* Floating Particles */}
                {animated && (
                    <div className="logo-particles">
                        <div className="particle particle-1"></div>
                        <div className="particle particle-2"></div>
                        <div className="particle particle-3"></div>
                        <div className="particle particle-4"></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Logo3D
