import ast

def predict_color(normalized_params):
    MAX_DISTANCE = 30
    src_r = normalized_params['r']
    src_g = normalized_params['g']
    src_b = normalized_params['b']
    koeff_sum = 0
    with open('userChoices.txt') as choices_file:
        choices = choices_file.read().split('|')
        for choice in choices:
            data_item = ast.literal_eval(choice)
            r = float(data_item['r'])
            g = float(data_item['g'])
            b = float(data_item['b'])
            background = int(data_item['background'])
            if background == 1:
                koeff = 1
            else:
                koeff = -1
            dist = ((r-src_r)**2 + (g-src_g)**2 + (b-src_b)**2)**0.5
            if dist < MAX_DISTANCE:
                koeff_sum = koeff_sum + koeff/(dist**1.8)
    if koeff_sum > 0:
        background = 'black'
    else:
        background = 'white'
    return {
        'backgroundColor': background
    }