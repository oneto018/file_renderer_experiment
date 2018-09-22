import shortid from 'shortid';
import fs from 'fs';
import fse from 'fs-extra';
import chokidar from 'chokidar';

export default function createElement (type, newProps, rootContainerInstance, _currentHostContext, workInProgress){

	var obj = {type,newProps,rootContainerInstance,_currentHostContext,workInProgress};
	var id = shortid.generate();

	console.log('creating',{type,props:newProps});
	var realPath = `./tmp/${id}`;
	if(type==='file'){
		var {children=''} = newProps;
		fse.ensureFileSync(realPath);
		fs.writeFileSync(realPath,children);
		// var {onChange} = newProps;
		// if(onChange){
		// 	chokidar.watch(realPath,{persistent:true}).on('change',(path)=>{
		// 		onChange(fs.readFileSync(path,{encoding:'utf8'}));
		// 	});
		// }
		return {type,props:newProps,realPath:realPath};
	}else if (type === 'folder'){
		return {type,props:newProps};
	}
}