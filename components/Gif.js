const GIPHY_LOADING_URL = 'https://thumbs.gfycat.com/BleakConsiderateAlbacoretuna-size_restricted.gif';
const styles = {
	minHeight: '310px',
	margin: '0.5em'
};

Gif = React.createClass({
	getUrl() {
		return this.props.sourceUrl || GIPHY_LOADING_URL;
	},

	render() {
		const url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;
	
		return (
			<div style={styles}>
				<a href={this.getUrl()} title='view this on giphy' target='new'>
					<img id='gif' src={url} style={
						{
							width: '100%', 
							maxWidth: '350px'
						}
					}/>
				</a>
			</div>
		);
	}
});