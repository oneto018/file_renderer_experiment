import fs from 'fs';
import shortid from 'shortid';
import chokidar from 'chokidar';

import {basename} from 'path';
const watcher={

};

chokidar.watch('./wd/').on('change',path=>{
	console.log(`${path} changed`,watcher[basename(path)],watcher);
	if(watcher[basename(path)]){
		watcher[basename(path)](fs.readFileSync(path,{encoding:'utf8'}));
	}
});

export default  function appendChild (parent, child) {
		console.log('append initial child',{parent,child});
		if(parent.type=='folder'){
			if(!parent.path){
				var path = parent.props.name;
				fs.mkdirSync(`./wd/${path}`);
				parent.path = path;
			}
		}

		if(parent.type=='folder' && child.type=='file'){
			let id = shortid.generate();
			fs.linkSync(child.realPath,`./wd/${parent.path}/${child.props.name}`);
			try{
				fs.unlinkSync(child.realPath);
			} catch(e){

			}

			fs.linkSync(`./wd/${parent.path}/${child.props.name}`,child.realPath);
			//child.resultPath = `./tmp/${id}`;

			var {onChange} = child.props;
			if(onChange){
				//console.log('onchange registering for ',);
				watcher[`${child.props.name}`] = onChange;
			}

			
		} else if (parent.type=='folder' && child.type=='folder'){
			if(child.path){
				fs.renameSync(`./wd/${child.path}`,`./wd/${parent.path}/${child.path}`);
			} else {
				fs.mkdirSync(`./wd/${parent.path}/${child.props.name}`);
				
			}
			child.path = `${parent.path}/${child.props.name}`;
		}
}