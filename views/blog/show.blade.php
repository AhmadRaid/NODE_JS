@extends('layouts.master')
@section('content')
@section('styles')
@livewireStyles @stop

<section class="content-main">
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title m-b-40">All Posts</h4>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home5" role="tab" aria-controls="home5" aria-expanded="true"><span class="hidden-sm-up"><i class="ti-home"></i></span>
                                        <span class="hidden-xs-down">Home</span></a>
                                </li>
                            </ul>
                            <div class="tab-content tabcontent-border p-20" id="myTabContent">
                                <div role="tabpanel" class="tab-pane fade show active" id="home5" aria-labelledby="home-tab">
                                    <p>.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@stop