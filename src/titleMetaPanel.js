import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { PanelBody, Button, Spinner } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { useState, useRef } from '@wordpress/element';

const TitleMetaPanel = () => {
	const title = useSelect(
		select => select('core/editor').getEditedPostAttribute('title'),
		[]
	);

	const [isLoading, setIsLoading] = useState(false);
	const count = useRef(0);
	const { editPost } = useDispatch('core/editor');

	const handleButton = () => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			count.current += 1;
			editPost({ title: `The Title changed ${count.current} times` });
		}, 2000);
	};

	return (
		<PluginDocumentSettingPanel
			name="title-meta-pane"
			title="Custom Title Control"
		>
			<PanelBody>
				<Button
					onClick={handleButton}
					disabled={isLoading}
					icon={isLoading ? <Spinner /> : undefined}
				>
					{isLoading ? 'Updating...' : 'Change Title'}
				</Button>
			</PanelBody>
		</PluginDocumentSettingPanel>
	);
};

registerPlugin('title-meta-panel', {
	render: TitleMetaPanel,
});
