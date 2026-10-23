/** Decode 8-bit RGB/RGBA screenshot PNGs with Node alone; no audit dependency. */
import {inflateSync} from 'node:zlib';
export function screenshotPixels(png){
 let offset=8,width,height,channels,idat=[];
 while(offset<png.length){const length=png.readUInt32BE(offset),type=png.toString('ascii',offset+4,offset+8),data=png.subarray(offset+8,offset+8+length);offset+=length+12;if(type==='IHDR'){width=data.readUInt32BE(0);height=data.readUInt32BE(4);if(data[8]!==8||![2,6].includes(data[9]))throw Error('Unsupported PNG');channels=data[9]===6?4:3;}if(type==='IDAT')idat.push(data);if(type==='IEND')break;}
 const raw=inflateSync(Buffer.concat(idat)),stride=width*channels,pixels=Buffer.alloc(stride*height);
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};let pos=0;
 for(let y=0;y<height;y++){const filter=raw[pos++];for(let x=0;x<stride;x++){const i=y*stride+x,a=x>=channels?pixels[i-channels]:0,b=y?pixels[i-stride]:0,c=y&&x>=channels?pixels[i-stride-channels]:0;pixels[i]=(raw[pos++]+[0,a,b,Math.floor((a+b)/2),paeth(a,b,c)][filter])&255;}}
 let white=0,dark=0,signature=0,samples=0;
 for(let y=65;y<height-65;y+=5)for(let x=2;x<width-2;x+=5){const i=(y*width+x)*channels,r=pixels[i],g=pixels[i+1],b=pixels[i+2];samples++;if(r>150&&g>150&&b>125)white++;if(r+g+b<140)dark++;signature=(signature+r*3+g*7+b*11)%1000000007;}
 return {white,dark,signature,samples,width,height,pixels,channels};
}
