import { multiply_matrix_vector, multiply_matrices } from "./linear-algebra.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;
const fov = (90 * Math.PI) / 180;
const near = 200;
const far = -200;
const aspect_ratio = width / height;
const eye = [0, 0, 400];
let counter = 0;
let angle = 0;

const perspective_matrix = [
  [1 / (aspect_ratio * Math.tan(fov / 2)), 0, 0, 0],
  [0, 1 / Math.tan(fov / 2), 0, 0],
  [0, 0, (far + near) / (near - far), (2 * far * near) / (far - near)],
  [0, 0, 1, 0],
];

const camera_matrix = [
  [1, 0, 0, -eye[0]],
  [0, 1, 0, -eye[1]],
  [0, 0, 1, -eye[2]],
  [0, 0, 0, 1],
];

const viewport_matrix = [
  [width / 2, 0, 0, 0],
  [0, height / 2, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];


const segments = [
  [
    [100, 100, 100, 1],
    [-100, 100, 100, 1],
  ],
  [
    [-100, 100, 100, 1],
    [-100, -100, 100, 1],
  ],
  [
    [-100, -100, 100, 1],
    [100, -100, 100, 1],
  ],
  [
    [100, -100, 100, 1],
    [100, 100, 100, 1],
  ],
  [
    [100, 100, -100, 1],
    [-100, 100, -100, 1],
  ],
  [
    [-100, 100, -100, 1],
    [-100, -100, -100, 1],
  ],
  [
    [-100, -100, -100, 1],
    [100, -100, -100, 1],
  ],
  [
    [100, -100, -100, 1],
    [100, 100, -100, 1],
  ],

  [
    [100, 100, 100, 1],
    [100, 100, -100, 1],
  ],
  [
    [-100, 100, 100, 1],
    [-100, 100, -100, 1],
  ],
  [
    [-100, -100, 100, 1],
    [-100, -100, -100, 1],
  ],
  [
    [100, -100, 100, 1],
    [100, -100, -100, 1],
  ],
];

function update() {
  counter += 10;

  if (counter >= 20) {
    // clear the canvas
    context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const rotationX_matrix = [
      [1, 0, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle), 0],
      [0, Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 0, 1],
    ];
    const rotationY_matrix = [
      [Math.cos(angle), 0, Math.sin(angle), 0],
      [0, 1, 0, 0],
      [-Math.sin(angle), 0, Math.cos(angle), 0],
      [0, 0, 0, 1],
    ];
    const rotationZ_matrix = [
      [Math.cos(angle), -Math.sin(angle), 0, 0],
      [Math.sin(angle), Math.cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];

    // transform the points
    let transform_matrix = multiply_matrices(viewport_matrix, perspective_matrix);
    transform_matrix = multiply_matrices(transform_matrix, camera_matrix);
    transform_matrix = multiply_matrices(transform_matrix, rotationX_matrix);
    transform_matrix = multiply_matrices(transform_matrix, rotationZ_matrix);
    transform_matrix = multiply_matrices(transform_matrix, rotationY_matrix);

    // draw the segments
    for (const segment of segments) {
      const [p1, p2] = segment;
      const [x1, y1, z1, w1] = multiply_matrix_vector(transform_matrix, p1);
      const [x2, y2, z2, w2] = multiply_matrix_vector(transform_matrix, p2);
      context.strokeStyle = "white";
      context.beginPath();
      context.moveTo(x1 / w1, y1 / w1);
      context.lineTo(x2 / w2, y2 / w2);
      context.stroke();
    }

    counter = 0;
    angle += 0.01;
  }
  requestAnimationFrame(update);
}

// set the canvas width and height
canvas.height = height;
canvas.width = width;

// Translate the coordinate system origin to the canvas center
context.translate(canvas.width * 0.5, canvas.height * 0.5);

requestAnimationFrame(update);
