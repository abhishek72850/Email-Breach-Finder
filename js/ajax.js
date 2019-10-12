var requestAjax=function(options){

	var object = {
		url:"https://haveibeenpwned.com/unifiedsearch/",
		type:"POST",
		datatype:'jsonp',
        crossDomain:true,
        isSuggestion:false
	};

	$.extend(object,options);

	univ.xhr=$.ajax(object).done(function(data){

		$('.loader').hide();

		if(data==null){
			console.log("No data found!!!");
		}
		else{
			console.log(data);

			try{

				data = JSON.parse(data);

				if(data.Breaches.length>0){
					$("header").animate({"height":"10em"},1000,function(){
					//$(".search_result_cont").toggleClass("search_result_cont_show");

						$('.breach_found').css({'visibility':'visible'});
						$('.breach_not_found').css({'visibility':'collapse'});

						$('#breach_count').text(data.Breaches.length);

						$('.breach_desc_cont>div').detach();

						for(var i in data.Breaches){
							var logo=$('<img/>',{
								'src':data.Breaches[i].LogoPath
							});

							var name=$('<h4></h4>',{
								'text':data.Breaches[i].Name
							});

							var bdate=$('<h4></h4>',{
								'text':'Breached On '+data.Breaches[i].BreachDate
							});

							var desc=$('<p></p>');
							desc.html(data.Breaches[i].Description);
							
							var compromised=$('<p></p>',{
								'html':'<span style="font-weight:bold">Compromised Data:</span> '+data.Breaches[i].DataClasses
							});

							var logo_cont=$('<div></div>');
							var desc_cont=$('<div></div>');

							var breach_cont=$('<div></div>');

							logo_cont.append(logo);
							desc_cont.append(name);
							desc_cont.append(bdate);
							desc_cont.append(desc);
							desc_cont.append(compromised);

							breach_cont.append(logo_cont);
							breach_cont.append(desc_cont);

							$('.breach_desc_cont').append(breach_cont);
						}

						if(data.Pastes != null){

							$('.pastes_rows>tr').detach();

							$('#pastes_count').text(data.Pastes.length);

							for(var i in data.Pastes){

								var title=$('<td></td>',{
									'text':data.Pastes[i].Title
								});
								var pdate=$('<td></td>',{
									'text':data.Pastes[i].Date
								});
								var ecount=$('<td></td>',{
									'text':data.Pastes[i].EmailCount
								});

								var pasteRow=$('<tr></tr>');

								pasteRow.append(title);
								pasteRow.append(pdate);
								pasteRow.append(ecount);

								$('.pastes_rows').append(pasteRow);
							}
						}
						else{
							$('#pastes_count').text('0');
							$('.breach_pastes_cont').css({'visibility':'collapse'});
						}			
					});	
				}
				else{
					$('.breach_found').css({'visibility':'collapse'});
					$('.breach_not_found').css({'visibility':'visible'});
				}	
			}
			catch(err){
				alert('Unable to Parse JSON '+err)
			}
		}
	});
}