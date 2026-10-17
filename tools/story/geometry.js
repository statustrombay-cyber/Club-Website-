import * as T from 'three';
// A single shared, subdivided sheet with 16 separate long strips. At zero
// separation it is a full sheet. Vertex deformation peels it into ribbons.
export function shredGeometry(strips=16,segments=30){
 const positions=[],uv=[],ids=[],index=[];
 for(let s=0;s<strips;s++)for(let j=0;j<=segments;j++)for(let side=0;side<2;side++){
  const u=(s+side)/strips,v=j/segments;
   positions.push(u-.5,(v-.5)*1.4,0);uv.push(u,v);ids.push((s+.5)/strips);
 }
 for(let s=0;s<strips;s++)for(let j=0;j<segments;j++){
  const a=s*(segments+1)*2+j*2;index.push(a,a+1,a+2,a+1,a+3,a+2);
 }
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setAttribute('stripId',new T.Float32BufferAttribute(ids,1));g.setIndex(index);g.computeVertexNormals();return g;
}
export function jaggedShape(seed=0){
 // Broken plate silhouettes, never a four-corner card or radial spider web.
 const profiles=[[[0,.12],[.08,.01],[.42,.035],[.68,0],[.95,.13],[1,.55],[.85,.94],[.43,1],[.09,.77]],[[.01,.26],[.21,.05],[.48,0],[.91,.04],[1,.84],[.69,.98],[.28,.88],[.04,.98]],[[0,.16],[.21,0],[.75,.02],[.97,.23],[.91,.71],[.78,.98],[.38,.93],[.04,1]],[[0,.08],[.48,0],[.94,.10],[1,.37],[.87,.80],[.53,1],[.06,.75]]];
 const profile=profiles[seed%profiles.length],s=new T.Shape();
 profile.forEach(([x,y],i)=>{const a=[(x-.5)*2.1,(.5-y)*1.47],n=profile[(i+1)%profile.length],b=[(n[0]-.5)*2.1,(.5-n[1])*1.47];i?s.lineTo(...a):s.moveTo(...a);for(let j=1;j<4;j++){const d=Math.sin(i*17+j*31+seed)*.005;s.lineTo(a[0]+(b[0]-a[0])*j/4+d,a[1]+(b[1]-a[1])*j/4+d);}});s.closePath();return s;
}
export function shapeWithUV(shape){const g=new T.ShapeGeometry(shape);const pos=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getX(i)+1.05)/2.1,(pos.getY(i)+.735)/1.47);return g;}
