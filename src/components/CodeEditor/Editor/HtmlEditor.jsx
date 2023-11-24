import { useContext } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/snippets/html';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import { EditorContext } from '../../../context/EditorContext';

export function HtmlEditor() {
	const { html, setHtml } = useContext(EditorContext);

	return (
		<AceEditor
			placeholder="Здесь ваш html код"
			mode="html"
			theme="twilight"
			name="editor_html"
			value={html}
			onChange={value => setHtml(value)}
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
