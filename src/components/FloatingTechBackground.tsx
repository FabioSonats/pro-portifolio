import React from 'react';

const FloatingTechBackground = () => {
    // Tech keywords for floating animation -
    const techKeywords = [
        'Python', 'ReactJS', 'SQL', 'Git', 'Flutter', 'Docker',
        'Tailwind', 'TypeScript', 'Node.js', 'AI', 'Scrum', 'Kanban',
        'JavaScript', 'HTML', 'CSS', 'API', 'Database', 'Testing',
        'Deploy', 'Mobile', 'Web', 'Frontend', 'Backend', 'Full Stack'
    ];

    // Algoritmo de espaçamento - garantir distância mínima
    const generatePositions = () => {
        const positions = [];
        const minDistance = 120; // Distância mínima em pixels
        const maxAttempts = 50; // Máximo de tentativas por palavra

        for (let i = 0; i < techKeywords.length; i++) {
            let attempts = 0;
            let validPosition = false;
            let x, y;

            while (!validPosition && attempts < maxAttempts) {
                x = Math.random() * 85 + 7.5; // 7.5% a 92.5% (margem de 7.5%)
                y = Math.random() * 85 + 7.5; // 7.5% a 92.5% (margem de 7.5%)

                // Verificar se a posição está longe o suficiente das outras
                validPosition = positions.every(pos => {
                    const distance = Math.sqrt(
                        Math.pow((x - pos.x) * window.innerWidth / 100, 2) +
                        Math.pow((y - pos.y) * window.innerHeight / 100, 2)
                    );
                    return distance >= minDistance;
                });

                attempts++;
            }

            // Se não encontrou posição válida, usar posição aleatória
            if (!validPosition) {
                x = Math.random() * 85 + 7.5;
                y = Math.random() * 85 + 7.5;
            }

            positions.push({ x, y });
        }

        return positions;
    };

    const positions = generatePositions();

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {techKeywords.map((keyword, index) => {
                const isEven = index % 3 === 0;
                const randomDelay = Math.random() * 2;
                const randomDuration = 4 + Math.random() * 2;
                const randomSize = 0.8 + Math.random() * 0.6;
                const position = positions[index];

                return (
                    <div
                        key={keyword}
                        className={`absolute font-medium text-sky-400/70 opacity-0 ${isEven ? 'animate-float-bg' :
                            index % 3 === 1 ? 'animate-float-bg-rotate' : 'animate-float-bg'
                            }`}
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            animationDelay: `${randomDelay}s`,
                            animationDuration: `${randomDuration}s`,
                            fontSize: `${randomSize}rem`,
                            fontWeight: Math.random() > 0.5 ? '500' : '400',
                        }}
                    >
                        {keyword}
                    </div>
                );
            })}
        </div>
    );
};

export default FloatingTechBackground;
