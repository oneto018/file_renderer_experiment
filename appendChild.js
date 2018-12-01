import fs from 'fs';
import chokidar from 'chokidar';

import {basename} from 'path';


export default  function appendChild (tag){
	return function(parent, child) {
		console.log(`append ${tag} child`,{parent,child});
		if(parent.type=='folder'){
			if(!parent.path){
				var path = parent.props.name;
				fs.mkdirSync(`./wd/${path}`);
				parent.path = path;
			}
		}

		if(parent.type=='folder' && child.type=='file'){
			var newLocation = `./wd/${parent.path}/${child.props.name}`;
			fs.linkSync(child.realPath,newLocation);
			try{
				fs.unlinkSync(child.realPath);
			} catch(e){

			}

			fs.linkSync(`./wd/${parent.path}/${child.props.name}`,child.realPath);

			
		} else if (parent.type=='folder' && child.type=='folder'){
			if(child.path){
				fs.renameSync(`./wd/${child.path}`,`./wd/${parent.path}/${child.path}`);
			} else {
				fs.mkdirSync(`./wd/${parent.path}/${child.props.name}`);
				
			}
			child.path = `${parent.path}/${child.props.name}`;
		}
}
}