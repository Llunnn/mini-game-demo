const shader = `
  attribute vec3 verticesTo; // 目标顶点位置
  uniform float val; // 动画运行时间
  varying vec3 vPos; // 将顶点位置传输给片元着色器

  void main() {
      // 计算粒子位置
      vPos.x = position.x * val + verticesTo.x * (1.-val);
      vPos.y = position.y * val + verticesTo.y * (1.-val);
      vPos.z = position.z * val + verticesTo.z * (1.-val);
      // 坐标转换
      vec4 mvPosition = modelViewMatrix * vec4( vPos, 1.0 );
      gl_PointSize = 1.5;
      gl_Position = projectionMatrix * mvPosition;
  }
`;

export default shader;
