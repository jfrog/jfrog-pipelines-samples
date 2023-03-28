<template>
    <div>
        <canvas class="wall" id="myCanvas" width="1280" height="550"> </canvas>
        <b-btn  @click="spin()" id='button' variant="success">Get Random Frog</b-btn>
    </div>
</template>


<script>
    const speed = function () {
        return [0.1 * Math.random() + 0.01, -(0.1 * Math.random() + 0.01)];
    };

    const createHTML = function () {
        const html = ['<ul>'];
        frogs.forEach(function (item, index) {
            item.index = index;
            let color = "white";
            html.push('<li><a href="#" style="color: ' + color + ';">' + item.name + '</a></li>');
        });
        html.push('</ul>');
        return html.join('');
    };

    export default {
        name: 'getApp',

        mounted() {
            let canvas = document.getElementById('myCanvas');
            canvas.innerHTML = createHTML();

            TagCanvas.Start('myCanvas', '', {
                textColour: null,
                initial: speed(),
                dragControl: 1,
                textHeight: 14
            });



            // resize the canvas to fill browser window dynamically
            window.addEventListener('resize', resizeCanvas, false);

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            resizeCanvas();
        },
        methods: {
            spin: function(){
                TagCanvas.SetSpeed('myCanvas', [0.5, 0.5]);
                setTimeout(() => {
                    TagCanvas.SetSpeed('myCanvas', [0.05 ,0.05]);
                    setTimeout(() => {
                        TagCanvas.SetSpeed('myCanvas', [0 ,0]);
                        const someFrog = frogs[Math.floor(Math.random() * frogs.length)];

                        this.$toasted.show(someFrog.name, {
                            theme: "toasted-primary",
                            icon: "check",
                            position: "top-center",
                            duration : 5000
                        });
                    } ,5000);
                }, 5000);
            },

        }
    }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .toastedFontSize {
        font-size: 30px !important;
    }

    #button {
        position:absolute;
        left:0%;
        top:10%
    }

    #myCanvas {
        position:absolute;
        background-color:lightgrey;
        width: 100%;
        display:block;
    }

    .wall {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-size: 100% 100%;
        background: #121936 url(../assets/universe.jpg) no-repeat center center;
    }

</style>
