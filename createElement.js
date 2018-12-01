import shortid from 'shortid';
import fs from 'fs';
import fse from 'fs-extra';
import chokidar from 'chokidar';
import bluebird from 'bluebird';
import {basename} from 'path';
const fs2 = bluebird.promisifyAll(fs);

const watcher={

};

chokidar.watch('./tmp/').on('change',async (path)=>{
	//console.log('file changed',path);
	var fileId = basename(path);
	if(fileId && watcher[fileId]){
		var content = await fs2.readFileAsync(path,'utf8');
		watcher[fileId](content);
	}
});

export default function createElement (type, newProps, rootContainerInstance, _currentHostContext, workInProgress){

	var obj = {type,newProps,rootContainerInstance,_currentHostContext,workInProgress};
	var id = shortid.generate();

	console.log('creating',{type,props:newProps});
	var realPath = `./tmp/${id}`;
	if(type==='file'){
		var {children=''} = newProps;
		fse.ensureFileSync(realPath);
		fs.writeFileSync(realPath,children);
		
		var {onChange} = newProps;
		if(onChange){
			watcher[id] = onChange;
		}
		return {type,id,props:newProps,realPath:realPath};
	}else if (type === 'folder'){
		return {type,props:newProps};
	}
}