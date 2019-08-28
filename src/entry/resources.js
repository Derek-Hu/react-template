import RenderDom from '~/entry';

RenderDom(require.context('~/pages/resources/', true, /\.js$/));
