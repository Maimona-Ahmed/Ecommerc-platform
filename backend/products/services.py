from itertools import product
from .models import (
    ProductVariant,
    ProductVariantOption,
)


class VariantService:

    @staticmethod
    def generate_variants(product):

        variations = product.variations.prefetch_related(
            "options"
        )

        option_groups = []

        for variation in variations:

            options = list(
                variation.options.all()
            )

            if not options:
                continue

            option_groups.append(options)

        if not option_groups:
            return []

        combinations = product(
            *option_groups
        )

        variants = []

        for combination in combinations:

            variant = ProductVariant.objects.create(
                product=product,
                price=product.price,
                stock=product.stock,
            )

            for option in combination:

                ProductVariantOption.objects.create(
                    variant=variant,
                    option=option,
                )

            variants.append(variant)

        return variants
