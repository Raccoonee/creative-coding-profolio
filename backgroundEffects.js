// P5.js sketch for background effect
const sketch = function(p) {
    let particles = [];
    const numParticles = 100;
    
    p.setup = function() {
      // Create canvas that covers the entire page
      let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.position(0, 0); // Position the canvas at the top-left corner
      canvas.style('position', 'fixed'); // Fixed position for full coverage
      canvas.style('z-index', '-1'); // Place it behind all content
      canvas.style('top', '0');
      canvas.style('left', '0');
      
      // Initialize particles
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
      
      p.background(248, 249, 250); // Match the existing background color
    };
    
    p.draw = function() {
      p.clear();
      p.background(248, 249, 250, 220); // Slightly transparent background for trail effect
      
      // Update and display all particles
      for (let particle of particles) {
        particle.update();
        particle.display();
      }
      
      // Add subtle connection lines between nearby particles
      connectParticles();
    };
    
    // Handle window resize
    p.windowResized = function() {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    
    // Particle class
    function Particle() {
      this.position = p.createVector(p.random(p.width), p.random(p.height));
      this.velocity = p.createVector(p.random(-0.3, 0.3), p.random(-0.3, 0.3));
      this.size = p.random(3, 6);
      this.color = p.color(0, 123, 255, p.random(50, 150)); // Blue color with varying opacity
      
      this.update = function() {
        // Update position
        this.position.add(this.velocity);
        
        // Bounce off edges
        if (this.position.x < 0 || this.position.x > p.width) {
          this.velocity.x *= -1;
        }
        if (this.position.y < 0 || this.position.y > p.height) {
          this.velocity.y *= -1;
        }
        
        // Slight random movement
        this.velocity.add(p.createVector(p.random(-0.05, 0.05), p.random(-0.05, 0.05)));
        
        // Limit velocity
        this.velocity.limit(1);
      };
      
      this.display = function() {
        p.noStroke();
        p.fill(this.color);
        p.ellipse(this.position.x, this.position.y, this.size);
      };
    }
    
    // Function to draw lines between nearby particles
    function connectParticles() {
      p.stroke(0, 123, 255, 15); // Light blue, very transparent
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          let distance = p.dist(
            particles[i].position.x, particles[i].position.y,
            particles[j].position.x, particles[j].position.y
          );
          
          if (distance < 120) {
            // The closer the particles, the more opaque the line
            let opacity = p.map(distance, 0, 120, 35, 0);
            p.stroke(0, 123, 255, opacity);
            p.line(
              particles[i].position.x, particles[i].position.y,
              particles[j].position.x, particles[j].position.y
            );
          }
        }
      }
    }
    
    // Make particles move toward mouse when it moves
    p.mouseMoved = function() {
      let mousePos = p.createVector(p.mouseX, p.mouseY);
      for (let particle of particles) {
        // Create a new direction vector by subtracting vectors manually
        let direction = p.createVector(
          mousePos.x - particle.position.x,
          mousePos.y - particle.position.y
        );
        direction.normalize();
        direction.mult(0.3);
        particle.velocity.add(direction);
      }
    };
  };
  
  // Initialize the P5 sketch
  document.addEventListener('DOMContentLoaded', function() {
    new p5(sketch);
  });