interface Point {
  x: number;
  y: number;
  z: number;
  connections: Point[];
}

interface SphereConfig {
  radius: number;
  numPoints: number;
  maxConnections: number;
  rotationSpeed: number;
  connectionThreshold: number;
  baseColor: [number, number, number];
  opacity: number;
  lineWidth: number;
  pointSize: number;
  perspective: number;
  connectFromOutside: boolean;
}

interface DrawConfig extends SphereConfig {
  width: number;
  height: number;
  rotation: number;
  mouseX: number;
  mouseY: number;
  isHovered: boolean;
}

export function createSpherePoints(config: SphereConfig): Point[] {
  const points: Point[] = [];
  const { radius, numPoints } = config;

  for (let i = 0; i < numPoints; i++) {
    // Use golden ratio for even distribution
    const phi = Math.acos(-1 + (2 * i) / numPoints);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    points.push({ x, y, z, connections: [] });
  }

  // Connect points based on configuration
  points.forEach(point => {
    const distanceFromCenter = Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z);
    const shouldConnect = config.connectFromOutside 
      ? distanceFromCenter >= radius * (config.connectionThreshold / 100)
      : true;

    if (shouldConnect) {
      const distances = points
        .filter(p => p !== point)
        .map(p => ({
          point: p,
          distance: Math.sqrt(
            Math.pow(p.x - point.x, 2) +
            Math.pow(p.y - point.y, 2) +
            Math.pow(p.z - point.z, 2)
          )
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, config.maxConnections);

      point.connections = distances.map(d => d.point);
    }
  });

  return points;
}

export function drawSphere(ctx: CanvasRenderingContext2D, points: Point[], config: DrawConfig) {
  const { width, height, rotation, baseColor, opacity, lineWidth, pointSize, perspective } = config;
  const centerX = width / 2;
  const centerY = height / 2;

  // Project points to 2D
  const projectedPoints = points.map(point => {
    // Rotate points
    const x = point.x * Math.cos(rotation) - point.z * Math.sin(rotation);
    const z = point.x * Math.sin(rotation) + point.z * Math.cos(rotation);
    const y = point.y;

    // Project 3D to 2D
    const scale = perspective / (perspective - z);
    const projectedX = x * scale + centerX;
    const projectedY = y * scale + centerY;

    return { ...point, projectedX, projectedY, scale };
  });

  // Draw connections first
  ctx.strokeStyle = `rgba(${baseColor.join(',')}, ${opacity})`; // Color with configured opacity
  ctx.lineWidth = lineWidth;
  projectedPoints.forEach(point => {
    point.connections.forEach(connection => {
      const connPoint = projectedPoints.find(p => p.x === connection.x && p.y === connection.y && p.z === connection.z);
      if (connPoint) {
        ctx.beginPath();
        ctx.moveTo(point.projectedX, point.projectedY);
        ctx.lineTo(connPoint.projectedX, connPoint.projectedY);
        ctx.stroke();
      }
    });
  });

  // Draw points
  projectedPoints.forEach(point => {
    const size = Math.max(1, point.scale * pointSize);
    const pointOpacity = Math.min(1, Math.max(0.2, (point.scale - 0.8) * 0.8));

    ctx.beginPath();
    ctx.arc(point.projectedX, point.projectedY, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${baseColor.join(',')}, ${pointOpacity})`;
    ctx.fill();
  });
} 