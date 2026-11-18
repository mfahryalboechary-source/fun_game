from django import template

register = template.Library()

@register.filter
def format_rupiah(value):
    try:
        value = int(value)
    except (ValueError, TypeError):
        return value
    
    if value >= 1000000:
        # Kalau jutaan, misal 1.500.000 jadi 1.5M
        result = value / 1000000
        return f"{result:.1f}".rstrip('0').rstrip('.') + "M"
    elif value >= 1000:
        # Kalau ribuan, misal 350.000 jadi 350K
        result = value / 1000
        return f"{result:.1f}".rstrip('0').rstrip('.') + "K"
    else:
        return str(value)