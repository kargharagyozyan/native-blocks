import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls, RichText } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton, Dropdown } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { content, textColor, textAlign, fontFamily } = attributes;

	const COLORS = [
		{ name: 'Black', color: '#000000' },
		{ name: 'Red', color: '#ff0000' },
		{ name: 'Blue', color: '#0000ff' },
		{ name: 'Green', color: '#00ff00' },
		{ name: 'Yellow', color: '#FFFF00' },
	];

	const TEXT_ALIGN_OPTIONS = [
		{ name: 'Left', value: 'left', icon: 'editor-alignleft' },
		{ name: 'Center', value: 'center', icon: 'editor-aligncenter' },
		{ name: 'Right', value: 'right', icon: 'editor-alignright' },
		{ name: 'Justify', value: 'justify', icon: 'editor-justify' },
	];
	const FONT_FAMILY_OPTIONS = [
		{ name: 'Default', value: 'inherit', icon: 'editor-removeformatting' },
		{ name: 'Arial', value: 'Arial, Helvetica, sans-serif', icon: 'editor-bold' },
		{ name: 'Georgia', value: 'Georgia, serif', icon: 'editor-italic' },
		{ name: 'Times New Roman', value: '"Times New Roman", Times, serif', icon: 'editor-textcolor' },
		{ name: 'Courier New', value: '"Courier New", Courier, monospace', icon: 'editor-code' },
		{ name: 'Verdana', value: 'Verdana, Geneva, sans-serif', icon: 'editor-strikethrough' },
		{ name: 'Roboto', value: 'Roboto, Arial, sans-serif', icon: 'format-aside' },
		{ name: 'Open Sans', value: '"Open Sans", Arial, sans-serif', icon: 'format-image' }
	];

	const currentFont = FONT_FAMILY_OPTIONS.find(
		(option) => option.value === fontFamily
	) || FONT_FAMILY_OPTIONS[0];

	const currentAlign = TEXT_ALIGN_OPTIONS.find(
		(option) => option.value === textAlign
	) || TEXT_ALIGN_OPTIONS[0];

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<Dropdown
						popoverProps={{ placement: 'bottom-start' }}
						renderToggle={({ isOpen, onToggle }) => (
							<ToolbarButton
								icon="admin-customizer"
								label="Pick Color"
								onClick={onToggle}
								aria-expanded={isOpen}
							/>
						)}
						renderContent={() => (
							<div style={{ padding: '10px' }}>
								{COLORS.map(({ name, color }) => (
									<button
										key={name}
										onClick={() => setAttributes({ textColor: color })}
										style={{
											backgroundColor: color,
											width: '30px',
											height: '30px',
											border: '1px solid #ccc',
											borderRadius: '50%',
											margin: '5px',
											cursor: 'pointer'
										}}
										aria-label={`Set color ${name}`}
									/>
								))}
							</div>
						)}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<Dropdown
						popoverProps={{placement: 'bottom-start'}}
						renderToggle={({isOpen, onToggle}) => (
							<ToolbarButton
								icon={currentAlign.icon}
								label={`Font: ${currentAlign.name}`}
								onClick={onToggle}
								aria-expanded={isOpen}
							/>
						)}
						renderContent={() => (
							<div style={{padding: '10px'}}>
								{TEXT_ALIGN_OPTIONS.map(({name, value, icon}) => (
									<button
										key={value}
										aria-label={name}
										title={name}
										onClick={() => setAttributes({ textAlign: value })}
										style={{
											cursor: 'pointer',
											padding: '8px',
											border: '1px solid #ccc',
											borderRadius: '4px',
											background: textAlign === value ? '#f0f0f0' : 'white',
										}}
									>
										<span className={`dashicons dashicons-${icon}`} />
									</button>
								))}
							</div>
						)}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<Dropdown
						popoverProps={{placement: 'bottom-start'}}
						renderToggle={({isOpen, onToggle}) => (
							<ToolbarButton
								icon={currentFont.icon}
								label={`Font: ${currentFont.name}`}
								onClick={onToggle}
								aria-expanded={isOpen}
							/>
						)}
						renderContent={() => (
							<div style={{padding: '10px'}}>
								{FONT_FAMILY_OPTIONS.map(({name, value, icon}) => (
									<button
										key={value}
										aria-label={name}
										title={name}
										onClick={() => setAttributes({ fontFamily: value })}
										style={{
											cursor: 'pointer',
											padding: '8px',
											border: '1px solid #ccc',
											borderRadius: '4px',
											background: fontFamily === value ? '#f0f0f0' : 'white',
											marginRight: '6px',
										}}
									>
										<span className={`dashicons dashicons-${icon}`} />
									</button>
								))}
							</div>
						)}
					/>
				</ToolbarGroup>
			</BlockControls>

			<RichText
				{...useBlockProps()}
				tagName="p"
				placeholder={__('Write text...', 'rating-card-block')}
				value={content}
				style={{ color: textColor, textAlign: textAlign, fontFamily: fontFamily  }}
				onChange={(val) => setAttributes({ content: val })}
			/>
		</>
	);
}
