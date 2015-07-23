import webiopi
import json

pca =  webiopi.deviceInstance("pwm0")


# setup function is automatically called at WebIOPi startup
def setup():
    global state
    state={'red':0,'green':0,'blue':0,'bright':0}
    #state=#load old state written in JSON


# loop function is repeatedly called by WebIOPi
#def loop():
#    pass

# destroy function is called at WebIOPi shutdown
def destroy():
    #save state to reload later
    pass

def apply(red,green,blue,bright):
    final_red   = red*bright/10000.0
    final_green = green*bright/10000.0
    final_blue  = blue*bright/10000.0
    pca.pwmWriteFloat(0,final_green)
    pca.pwmWriteFloat(1,final_blue)
    pca.pwmWriteFloat(2,final_red)


@webiopi.macro
def update(red,green,blue,bright):
    # le paramètre est à -1 si on conserve sa valeur précedente
    the_dict={'red':float(red), 'green':float(green), 'blue':float(blue), 'bright':float(bright) }

    global state
    #on récupère les valeurs qu'il nous manque
    for param in the_dict:
        if the_dict[param] == -1:
            the_dict[param] = state[param]

    # petit algo maison: seuls les rapports de la valeur de chaque couleur compte, pas sa valeur propre
    try:
        coeff=100.0/max(the_dict["red"], the_dict["green"], the_dict["blue"])
    except :
        coeff=0

    #on sauvegarde les nouvelles valeurs tronquées
    for param in the_dict:
        if param != "bright":
            state[param] = float(str(the_dict[param]*coeff)[:4])
        else :
            state[param] = float(str(the_dict[param]/coeff)[:4])


    #on applique le tout
    apply(state['red'],state['green'],state['blue'],state['bright'])
    return json.dumps([state['red'],state['green'],state['blue'],state['bright']])

@webiopi.macro
def morning():
    apply(0,10,0,10)

@webiopi.macro
def gotobed():
    apply(8,0,0,100)

@webiopi.macro
def off():
    apply(0,0,0,0)
