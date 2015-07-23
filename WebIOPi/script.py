import webiopi

pca =  webiopi.deviceInstance("pwm0")

def ServoMin():
    pca.pwmWriteAngle(15, -45.0)

# setup function is automatically called at WebIOPi startup
def setup():
    global state
    state={'red':0,'green':0,'blue':0,'bright':0}
    update("started")
    #state=#load old state written in JSON


# loop function is repeatedly called by WebIOPi
def loop():
    pass

# destroy function is called at WebIOPi shutdown
def destroy():
    #save state to reload later
    pass

def apply(red,green,blue,bright):
    finale_red   = red*bright/10000.0
    finale_green = green*bright/10000.0
    finale_blue  = blue*bright/10000.0
    pca.pwmWriteFloat(0,green)
    pca.pwmWriteFloat(1,blue)
    pca.pwmWriteFloat(2,red)


@webiopi.macro
def update(the_dict):
    # the_dict est de la forme {paramete: valeur; ...}
    webiopi.debug("in update "+str(the_dict))
    # global state
    # #on met a jour les nouvelles données
    # for i,j in the_dict:
    #     state[i]=the_dict[i]
    # #on applique le tout
    # apply(state['red'],state['green'],state['blue'],state['bright'])
