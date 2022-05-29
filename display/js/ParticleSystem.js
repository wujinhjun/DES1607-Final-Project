class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    addParticle = (x, y) => {
        this.particles.push(new Particle(x, y));
    }

    display = () => {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}