import React, {useEffect} from 'react'

const Canvas = props => {
    const styleCanvas = {
        width: '600',
        height: '600',
        border: '1px red solid',
        margin: '20px'
    }
    const rect = { x: 10, y: 10, w: 10, h: 10}
    const draw = ctx => {
        ctx.fillStyle = '#000000'
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
    }

    useEffect(() => {
        const canvas = document.getElementById('canvas')
        console.log(canvas)
        const context = canvas.getContext('2d')

        for (let i = 0; i < 5; i += 1 ) {
            draw(context)
            // rect.x += 10
            rect.y += 10
        }
    }, [draw])



    return <canvas style={styleCanvas} {...props}  id='canvas'/>
}
export default Canvas