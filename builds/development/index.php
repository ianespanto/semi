<?php

// Add header
$pageClass = 'home';
include 'snippets/header.php';

// Global variables
$partners = array('github','less','envato','apple','spotify');

// Parse data file
$jsonFile = file_get_contents("js/data.json");
$data = json_decode($jsonFile, true);
$valueProps = $data['value-props'];
$testimonials = $data['testimonials'][0];
$plans = $data['plans'];
$copy = $data['home-copy'];

?>

<main>

	<!-- HERO -->
	<section class="home__hero">
		<div class="inner-wrapper">
			<div class="hero-content flex flex--column align-center animated still">
				<h1><?php echo $copy['hero-heading']; ?></h1>
				<p><?php echo $copy['hero-copy']; ?></p>
				<div class="form-container">
					<form id="hp-hero-form" name="hp-hero-form" method="post">
						<div class="flex flex--responsive portrait grid grid--gutters">
							<div class="grid__item">
								<div class="form-group">
									<input type="text" name="full-name" placeholder="Full name">
								</div>
							</div>
							<div class="grid__item">
								<div class="form-group">
									<input type="text" name="your-site" placeholder="@yoursite.com">
								</div>
							</div>
							<div class="grid__item">
								<div class="form-group">
									<button class="btn btn--primary btn--full"><?php echo $copy['hero-cta']; ?></button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="down-arrow">
				<span></span>
			</div>
		</div>
	</section>

	<!-- PARTNER LOGOS -->
	<section class="home__partners">
		<div class="inner-wrapper">
			<div class="partners-content flex flex--row flex--wrap align-center animated still">
				<?php foreach($partners as $partner): ?>
					<div class="partner flex align-center">
						<img src="./images/logos/<?php echo $partner; ?>.png" alt="<?php echo ucfirst($partner); ?>">
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<!-- VIDEO -->
	<section class="home__video animated">
		<div class="inner-wrapper">
			<div class="video-content flex flex--responsive portrait align-center width-limit">
				<div class="video-content__copy">
					<h2><?php echo $copy['video-heading']; ?></h2>
					<h5><?php echo $copy['video-subheading']; ?></h5>
					<p><?php echo $copy['video-copy']; ?></p>
				</div>
				<div class="video-content__video flex align-center">
					<div class="play-button"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- VALUE PROPS -->
	<section class="home__props animated">
		<div class="inner-wrapper">
			<div class="props-content flex flex--responsive portrait grid grid--gutters large-gutters align-center width-limit">
				<?php foreach($valueProps as $prop): ?>
					<div class="value-prop grid__item">
						<div class="value-prop__icon">
							<img src="./images/icons/<?php echo $prop['icon']; ?>.png">
						</div>
						<h4><?php echo $prop['title']; ?></h4>
						<p><?php echo $prop['copy']; ?></p>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<!-- TESTIMONIALS -->
	<section class="home__testimonials animated">
		<div class="inner-wrapper">
			<div class="testimonials-content flex flex--responsive portrait align-center width-limit">
				<div class="testimonials-content__copy">
					<blockquote>“<?php echo $testimonials[quote]; ?>”</blockquote>
					<p class="testimonial-name"><?php echo $testimonials[name]; ?></p>
					<p class="testimonial-company"><?php echo $testimonials[company]; ?></p>
				</div>
				<div class="testimonials-content__image">
					<img src="./images/silhouette.png">
				</div>
			</div>
		</div>
	</section>

	<!-- PLANS -->
	<section class="home__plans animated">
		<div class="inner-wrapper">
			<div class="plans-content flex flex--responsive medium flex--wrap grid grid--gutters large-gutters align-center width-limit">
				<div class="plans-content__intro grid__item flex flex--column align-center">
					<h2><?php echo $copy['plans-heading']; ?></h2>
					<p class="plans-copy"><?php echo $copy['plans-copy']; ?></p>
					<p class="plans-question"><?php echo $copy['plans-question']; ?></p>
					<a class="plans-cta" href="/"><?php echo $copy['plans-cta']; ?></a>
				</div>
				<?php foreach($plans as $i=>$p): ?>
					<div class="plans-content__plan grid__item">
						<div class="plan<?php if($i == 0) echo ' dark'; ?>">
							<p class="plan__name"><?php echo $p['name']; ?></p>
							<p class="plan__price"><span><?php echo $p['price']; ?></span><span>$</span></p>
							<p class="plan__description"><?php echo $p['description']; ?></p>
							<div class="form-group">
								<button class="btn btn--round btn--<?php echo $i==1 ? 'white':'primary'; ?>"><span><?php echo $p['cta']; ?></span></button>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

	<!-- BOTTOM -->
	<section class="home__bottom">
		<div class="inner-wrapper flex align-center">
			<div class="bottom-content animated still">
				<h2><?php echo $copy['bottom-heading']; ?></h2>
				<p><?php echo $copy['bottom-copy']; ?></p>
				<div class="form-group">
					<button class="btn btn--secondary"><?php echo $copy['bottom-cta']; ?></button>
				</div>
			</div>
		</div>
	</section>

</main>

<?php include 'snippets/footer.php'; ?>
