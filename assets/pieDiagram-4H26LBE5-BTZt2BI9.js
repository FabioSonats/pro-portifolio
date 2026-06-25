import{D as Y,n as tt,o as et,s as at,g as rt,c as nt,b as it,_ as p,l as W,v as st,d as lt,E as ot,I as ct,Q as ut,k as gt}from"./mermaid.core-BjJS-DgR.js";import{p as pt}from"./chunk-4BX2VUAB-D8MFnQ8F.js";import{p as dt}from"./wardley-L42UT6IY-BjpJ1TlL.js";import{d as _}from"./arc-BervDnhQ.js";import{j as S,t as R,q as ft,r as ht}from"./index-BEi2TeJz.js";function mt(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function vt(t){return t}function xt(){var t=vt,a=mt,f=null,y=S(0),s=S(R),d=S(0);function l(e){var n,o=(e=ft(e)).length,c,h,v=0,u=new Array(o),i=new Array(o),x=+y.apply(this,arguments),w=Math.min(R,Math.max(-R,s.apply(this,arguments)-x)),m,C=Math.min(Math.abs(w)/o,d.apply(this,arguments)),$=C*(w<0?-1:1),g;for(n=0;n<o;++n)(g=i[u[n]=n]=+t(e[n],n,e))>0&&(v+=g);for(a!=null?u.sort(function(A,D){return a(i[A],i[D])}):f!=null&&u.sort(function(A,D){return f(e[A],e[D])}),n=0,h=v?(w-o*$)/v:0;n<o;++n,x=m)c=u[n],g=i[c],m=x+(g>0?g*h:0)+$,i[c]={data:e[c],index:n,value:g,startAngle:x,endAngle:m,padAngle:C};return i}return l.value=function(e){return arguments.length?(t=typeof e=="function"?e:S(+e),l):t},l.sortValues=function(e){return arguments.length?(a=e,f=null,l):a},l.sort=function(e){return arguments.length?(f=e,a=null,l):f},l.startAngle=function(e){return arguments.length?(y=typeof e=="function"?e:S(+e),l):y},l.endAngle=function(e){return arguments.length?(s=typeof e=="function"?e:S(+e),l):s},l.padAngle=function(e){return arguments.length?(d=typeof e=="function"?e:S(+e),l):d},l}var V=Y.pie,z={sections:new Map,showData:!1,config:V},T=z.sections,F=z.showData,St=structuredClone(V),yt=p(()=>structuredClone(St),"getConfig"),wt=p(()=>{T=new Map,F=z.showData,st()},"clear"),At=p(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(t)||(T.set(t,a),W.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),Dt=p(()=>T,"getSections"),Ct=p(t=>{F=t},"setShowData"),$t=p(()=>F,"getShowData"),j={getConfig:yt,clear:wt,setDiagramTitle:tt,getDiagramTitle:et,setAccTitle:at,getAccTitle:rt,setAccDescription:nt,getAccDescription:it,addSection:At,getSections:Dt,setShowData:Ct,getShowData:$t},Tt=p((t,a)=>{pt(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),kt={parse:p(async t=>{const a=await dt("pie",t);W.debug(a),Tt(a,j)},"parse")},Et=p(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),bt=Et,Mt=p(t=>{const a=[...t.values()].reduce((s,d)=>s+d,0),f=[...t.entries()].map(([s,d])=>({label:s,value:d})).filter(s=>s.value/a*100>=1);return xt().value(s=>s.value).sort(null)(f)},"createPieArcs"),Rt=p((t,a,f,y)=>{var O;W.debug(`rendering pie chart
`+t);const s=y.db,d=lt(),l=ot(s.getConfig(),d.pie),e=40,n=18,o=4,c=450,h=c,v=ct(a),u=v.append("g");u.attr("transform","translate("+h/2+","+c/2+")");const{themeVariables:i}=d;let[x]=ut(i.pieOuterStrokeWidth);x??(x=2);const w=l.textPosition,m=Math.min(h,c)/2-e,C=_().innerRadius(0).outerRadius(m),$=_().innerRadius(m*w).outerRadius(m*w);u.append("circle").attr("cx",0).attr("cy",0).attr("r",m+x/2).attr("class","pieOuterCircle");const g=s.getSections(),A=Mt(g),D=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let k=0;g.forEach(r=>{k+=r});const G=A.filter(r=>(r.data.value/k*100).toFixed(0)!=="0"),E=ht(D).domain([...g.keys()]);u.selectAll("mySlices").data(G).enter().append("path").attr("d",C).attr("fill",r=>E(r.data.label)).attr("class","pieCircle"),u.selectAll("mySlices").data(G).enter().append("text").text(r=>(r.data.value/k*100).toFixed(0)+"%").attr("transform",r=>"translate("+$.centroid(r)+")").style("text-anchor","middle").attr("class","slice");const U=u.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText"),L=[...g.entries()].map(([r,M])=>({label:r,value:M})),b=u.selectAll(".legend").data(L).enter().append("g").attr("class","legend").attr("transform",(r,M)=>{const P=n+o,H=P*L.length/2,J=12*n,K=M*P-H;return"translate("+J+","+K+")"});b.append("rect").attr("width",n).attr("height",n).style("fill",r=>E(r.label)).style("stroke",r=>E(r.label)),b.append("text").attr("x",n+o).attr("y",n-o).text(r=>s.getShowData()?`${r.label} [${r.value}]`:r.label);const q=Math.max(...b.selectAll("text").nodes().map(r=>(r==null?void 0:r.getBoundingClientRect().width)??0)),Q=h+e+n+o+q,N=((O=U.node())==null?void 0:O.getBoundingClientRect().width)??0,X=h/2-N/2,Z=h/2+N/2,B=Math.min(0,X),I=Math.max(Q,Z)-B;v.attr("viewBox",`${B} 0 ${I} ${c}`),gt(v,c,I,l.useMaxWidth)},"draw"),Wt={draw:Rt},It={parser:kt,db:j,renderer:Wt,styles:bt};export{It as diagram};
