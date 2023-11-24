import { useContext } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/snippets/css';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import { EditorContext } from '../../../context/EditorContext';

export function CssEditor() {
	const { css, setCss } = useContext(EditorContext);

	return (
		<AceEditor
			placeholder="Здесь ваш css код"
			mode="css"
			theme="twilight"
			name="editor_css"
			value={css}
			onChange={value => setCss(value)}
			fontSize={16}
			height={'100%'}
			width={'100%'}
			showPrintMargin={true}
			showGutter={true}
			highlightActiveLine={false}
			setOptions={{
				enableBasicAutocompletion: true,
				enableLiveAutocompletion: true,
				enableSnippets: true,
				tabSize: 2
			}}
		/>
	);
}
